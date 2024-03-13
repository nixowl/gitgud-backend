import { type Context } from 'hono';
import { findUserById } from './user.service';

export async function getSessionUserHandler(c: Context) {
  const userId = c.get('userId') as string;

  if (!userId) {
    c.status(401);
    return c.json({ message: 'Not authorized' });
  }

  const user = await findUserById(userId);

  return c.json({ user });
}
