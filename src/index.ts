import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { db } from '~/lib/db';
import { users } from '~/lib/schema';
import { authRoutes } from '~/module/auth/auth.route';
import { userRoutes } from './module/user/user.route';
import { awsRoutes } from '~/module/aws/aws.route';
const app = new Hono().basePath('/api/v1');

// this logger logs every request
app.use('*', logger());
app.use('*', cors({
  origin: 'http://localhost:3000',
}));

// routes
app.route('/auth', authRoutes);
app.route('/user', userRoutes);
app.route('/upload', awsRoutes);

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
  port: process.env.PORT ?? 8080,
  fetch: app.fetch,
};
