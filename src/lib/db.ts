import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import 'dotenv/config';

const dbUrl: string = process.env.DATABASE_URL!;

const queryClient = postgres(dbUrl);
export const db = drizzle(queryClient);
