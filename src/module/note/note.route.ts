import { Hono } from 'hono';
import { protectRoute } from '~/middleware/auth.middleware';
import * as noteController from '~/module/note/note.controller';

export const noteRoutes = new Hono();

noteRoutes.use('*', protectRoute);
noteRoutes.post('/', noteController.createNoteHandler);
noteRoutes.get('/:id', noteController.getNoteByIdHandler);
noteRoutes.delete('/:id', noteController.deleteNoteHandler);
