import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { db } from '~/lib/db';
import { users } from '~/lib/schema';
import { authRoutes } from '~/module/auth/auth.route';
import { userRoutes } from './module/user/user.route';
import { awsRoutes } from '~/module/aws/aws.route';
import { ENV } from '~/lib/env';
import { swaggerUI } from '@hono/swagger-ui'
import * as z from 'zod';

const app = new OpenAPIHono();

app.doc("/ui", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "GitGud API",
  },
});

const basicRoute = createRoute({
  method: "get",
  path: "/",

  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            time: z.string(),
          }),
        },
      },
      description: "return hello world message and current time",
    },
  },
});

app.openapi(basicRoute, (c) => {
  return c.json({ message: 'Hello, World!', time: new Date() }, 200);
});

// this logger logs every request
app.use('*', logger());
app.use('*', cors({
  origin: ENV.CLIENT_ADDRESS,
}));

// routes
app.route('/api/v1/auth', authRoutes);
app.route('/api/v1/user', userRoutes);
app.route('/api/v1/upload', awsRoutes);



app.get('/', (c) => {
  return c.json({ message: 'Hello, World!', time: new Date() });
});

app.get('/test-user', async (c) => {
  const user = await db.select().from(users);
  console.log('user', user);
  return c.json({ user });
});

app.get('/doc', swaggerUI({ url: '/ui' }))

// this is how we expose port and add api methods
export default {
  port: ENV.PORT ?? 8079,
  fetch: app.fetch,
};
