import * as awsControllers from '~/module/aws/aws.controller';
import { Hono } from 'hono';

export const awsRoutes = new Hono();

awsRoutes.get('/image', (c) => awsControllers.uploadImageHandler(c));
