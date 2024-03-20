import * as z from "zod";
import { log } from '~/lib/logger';

const envSchema = z.object({
  PORT: z.string().trim().min(1),
  AWS_REGION: z.string().trim().min(1),
  AWS_ACCESS_KEY_ID: z.string().trim().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().trim().min(1),
  DATABASE_URL: z.string().trim().min(1),
  S3_BUCKET_NAME: z.string().trim().min(1),
  CLIENT_ADDRESS: z.string().trim().min(1),
});

const parsedEnvs = envSchema.safeParse({
  PORT: process.env.PORT,
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  CLIENT_ADDRESS: process.env.CLIENT_ADDRESS,
})

if (!parsedEnvs.success) {
  log.error(parsedEnvs.error.errors);
  process.exit(1);
}

export const ENV = parsedEnvs.data;