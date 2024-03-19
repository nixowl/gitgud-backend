import * as userController from '~/module/user/user.controller';
import { Hono } from 'hono';
import { protectRoute } from '~/middleware/auth.middleware';

export const userRoutes = new Hono();

userRoutes.use('*', protectRoute);
userRoutes.get('/', (c) => userController.getSessionUserHandler(c))
userRoutes.get('/all', (c) => userController.getAllUsersHandler(c))
userRoutes.get('/:id', (c) => userController.getUserByIdHandler(c))
userRoutes.patch('/:id', (c) => userController.updateUserHandler(c))
userRoutes.delete('/:id', (c) => userController.deleteUserHandler(c))