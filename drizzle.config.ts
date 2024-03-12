import type { Config } from 'drizzle-kit';
import 'dotenv/config';

//TODO env validation
export default {
  schema: './src/lib/schema.ts',
  out: './migration',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
