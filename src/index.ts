import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { log } from '~/lib/logger';
import { db } from '~/lib/db';
import { users } from '~/lib/schema';
import { authRoutes } from '~/module/auth/auth.route';
import { userRoutes } from './module/user/user.route';
import { createBunWebSocket } from 'hono/bun';

const app = new Hono().basePath('/api/v1');
const { upgradeWebSocket, websocket } = createBunWebSocket();

// this logger logs every request
app.use('*', logger());
app.use(
  '*',
  cors({
    origin: 'http://localhost:3000',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);

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

// terrible code, but works for now
app.get(
  '/ws',
  upgradeWebSocket((c) => {
    return {
      onMessage(event, ws) {
        console.log(`Message from client: ${event.data}`);
        ws.send(event.data + ' from server');
      },
      onOpen: (ws) => {
        console.log('Client connected');
      },
      onError: (err) => {
        console.error('Error:', err);
      },
    };
  }),
);

log.info('Server is running on port 8080');
Bun.serve({
  fetch: app.fetch,
  websocket,
  port: 8080,
});
