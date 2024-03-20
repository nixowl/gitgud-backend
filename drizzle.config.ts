import type { Config } from 'drizzle-kit';
import { ENV } from '~/lib/env';

export default {
  schema: './src/lib/schema.ts',
  out: './migration',
  driver: 'pg',
  dbCredentials: {
    connectionString: ENV.DATABASE_URL,
  },
} satisfies Config;
