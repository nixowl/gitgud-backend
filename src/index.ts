import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { db } from '~/lib/db';
import { users } from '~/lib/schema';
import { authRoutes } from '~/module/auth/auth.route';
import { userRoutes } from './module/user/user.route';
const app = new Hono().basePath('/api/v1');

// this logger logs every request
app.use('*', logger());

// routes
app.route('/auth', authRoutes);
app.route('/user', userRoutes);

app.get('/', (c) => {
  return c.json({ message: 'Hello, World!', time: new Date() });
});

app.get('/test-user', async (c) => {
  const user = await db.select().from(users);
  console.log('user', user);
  return c.json({ user });
});

// this is how we expose port and add api methods
export default {
  port: 8080,
  fetch: app.fetch,
};
