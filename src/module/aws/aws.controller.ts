import type { Context } from 'hono';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {  PutObjectCommand } from "@aws-sdk/client-s3";
import { nanoid } from 'nanoid';
import { s3 } from '~/lib/aws';

export async function uploadImageHandler(c: Context) {
 const key = nanoid();
  const command = new PutObjectCommand({
    Bucket: "gitgudbucket",
    Key: key,
  });

  const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
  console.log('url', presignedUrl)
  return c.json({ presignedUrl, key });
}
