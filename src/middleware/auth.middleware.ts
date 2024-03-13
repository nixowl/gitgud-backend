import type { Context, Next } from 'hono';
import { log } from '~/lib/logger';
import { findTokenByHash } from '~/module/user/user.service';

export async function protectRoute(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader && !!authHeader?.startsWith('Bearer ')) {
    c.status(401);
    return c.json({ message: 'Not authorized' });
  }

  const token = authHeader?.split(' ')[1];
  if (!token) {
    c.status(401);
    return c.json({ message: 'Not authorized' });
  }

  try {
    const foundToken = await findTokenByHash(token);
    if (!foundToken || new Date() > new Date(foundToken.expiry)) {
      c.status(401);
      return c.json({ message: 'Not authorized' });
    }

    // we have now user id in the context
    // next will call the next middleware or route handler
    c.set('userId', foundToken.userId);
    await next();
  } catch (error) {
    log.error('Error in protectRoute middleware', error);
    c.status(500);
    return c.json({ message: 'Internal server error' });
  }
}
