import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { ENV } from '~/lib/env';

const dbUrl: string = ENV.DATABASE_URL;

const queryClient = postgres(dbUrl);
export const db = drizzle(queryClient);
