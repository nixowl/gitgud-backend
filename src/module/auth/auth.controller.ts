import { type Context } from 'hono';
import {
  type LoginUserType,
  loginUserValidator,
  type RegisterUserType,
  registerUserValidator,
} from '~/module/auth/auth.validator';
import { hashPassword, insertToken, insertUser, verifyPassword } from '~/module/auth/auth.service';
import { nanoid } from 'nanoid';
import { findUserByEmail } from '~/module/user/user.service';
import { log } from '~/lib/logger';

const day = 24 * 60 * 60 * 1000;

export async function registerUserHandler(c: Context) {
  const { username, password, email } = await c.req.json<RegisterUserType>();

  const { success } = registerUserValidator.safeParse({ username, password, email });
  if (!success) {
    c.status(400);
    return c.json({ error: 'Invalid request' });
  }

  try {
    const hashedPassword = await hashPassword(password);
    const user = await insertUser({ username, password: hashedPassword, email });
    const token = await insertToken({
      hash: nanoid(),
      userId: user.id,
      scope: 'authentication',
      expiry: new Date(Date.now() + 30 * day),
    });

    c.status(201);
    return c.json({ token: token.hash });
  } catch (e) {
    log.error(e);
    c.status(500);
    return c.json({ error: 'Internal server error' });
  }
}

export async function loginUserHandler(c: Context) {
  const { email, password } = await c.req.json<LoginUserType>();
  console.log(email, password);
  const { success } = loginUserValidator.safeParse({ email, password });
  console.log(success);
  if (!success) {
    c.status(400);
    return c.json({ error: 'Invalid request' });
  }

  try {
    const user = await findUserByEmail(email);
    console.log(user);
    if (!user) {
      c.status(401);
      return c.json({ msg: 'Invalid credentials' });
    }

    const passwordValid = await verifyPassword(password, user.password);
    const token = await insertToken({
      hash: nanoid(),
      userId: user.id,
      scope: 'authentication',
      expiry: new Date(Date.now() + 30 * day),
    });

    if (!passwordValid) {
      c.status(401);
      return c.json({ msg: 'Invalid credentials' });
    }

    return c.json({
      user,
      token: token.hash,
    });
  } catch (e) {
    console.log(e);
    c.status(500);
    return c.json({ msg: 'Amazing error handling' });
  }
}
