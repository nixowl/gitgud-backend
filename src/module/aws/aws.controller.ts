import type { Context } from 'hono';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {  PutObjectCommand } from "@aws-sdk/client-s3";
import { nanoid } from 'nanoid';
import { s3 } from '~/lib/aws';
import { ENV } from '~/lib/env';

export async function uploadImageHandler(c: Context) {
 const key = nanoid();
  const command = new PutObjectCommand({
    Bucket: ENV.S3_BUCKET_NAME,
    Key: key,
  });

  const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return c.json({ presignedUrl, key });
}
