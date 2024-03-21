import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import * as z from 'zod';

export const openapiRoutes = new OpenAPIHono();

openapiRoutes.doc('/ui', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'GitGud API',
  },
});

const basicRoute = createRoute({
  method: 'get',
  path: '/',

  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
            time: z.string(),
          }),
        },
      },
      description: 'return hello world message and current time',
    },
  },
});

openapiRoutes.openapi(basicRoute, (c) => {
  return c.json({ message: 'Hello, World!', time: new Date() }, 200);
});

openapiRoutes.get('/doc', swaggerUI({ url: '/ui' }));
