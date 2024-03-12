import { Hono } from 'hono';
import { logger } from 'hono/logger';
const app = new Hono();

// this logger logs every request
app.use('*', logger());

app.get('/', (c) => {
  return c.json({ message: 'Hello, World!', time: new Date() });
});

// this is how we expose port and add api methods
export default {
  port: 8080,
  fetch: app.fetch,
};
