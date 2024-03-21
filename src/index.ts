import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { authRoutes, awsRoutes, noteRoutes, userRoutes } from '~/module';

import { ENV } from '~/lib/env';
import { Hono } from 'hono';
import { openapiRoutes } from '~/openpi';

const app = new Hono();

// this logger logs every request
app.use('*', logger());
app.use(
  '*',
  cors({
    origin: ENV.CLIENT_ADDRESS,
  }),
);

// routes
app.route('/', openapiRoutes);
app.route('/api/v1/auth', authRoutes);
app.route('/api/v1/user', userRoutes);
app.route('/api/v1/upload', awsRoutes);
app.route('/api/v1/note', noteRoutes);

app.get('/', (c) => {
  return c.json({ message: 'Hello, World!', time: new Date() });
});

// this is how we expose port and add api methods
export default {
  port: ENV.PORT ?? 8079,
  fetch: app.fetch,
};
