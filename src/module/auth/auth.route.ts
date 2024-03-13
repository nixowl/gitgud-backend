import * as authControllers from '~/module/auth/auth.controller';
import { Hono } from 'hono';

export const authRoutes = new Hono();

authRoutes.post('/sign-up', (c) => authControllers.registerUserHandler(c));
authRoutes.post('/sign-in', (c) => authControllers.loginUserHandler(c));
