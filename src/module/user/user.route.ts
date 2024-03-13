import * as userController from '~/module/user/user.controller';
import { Hono } from 'hono';
import { protectRoute } from '~/middleware/auth.middleware';

export const userRoutes = new Hono();

userRoutes.use('*', protectRoute);
userRoutes.get('/', (c) => userController.getSessionUserHandler(c));
