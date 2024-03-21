import { type Context } from 'hono';
import { noteValidator, type NoteValidator } from './note.validator';
import { log } from '~/lib/logger';
import { deleteNote, getNoteById, insertNote } from './note.service';

export async function createNoteHandler(c: Context) {
  const { content, title, icon, status }: NoteValidator = await c.req.json();
  const userId = c.get('userId') as string;

  if (!userId) {
    c.status(401);
    return c.json({ message: 'Not authorized' });
  }

  const { success } = noteValidator.safeParse({
    icon,
    status,
    title,
    content,
  });
  if (!success) {
    c.status(400);
    return c.json({ error: 'Invalid request' });
  }

  try {
    const note = await insertNote(
      {
        content,
        title,
        icon,
        status,
      },
      userId,
    );

    c.status(201);
    return c.json({ note });
  } catch (e) {
    log.error(e);
    c.status(500);
    return c.json({ error: 'Internal server error' });
  }
}

export async function getNoteByIdHandler(c: Context) {
  const noteId = c.req.param('id');
  const userId = c.get('userId') as string;

  if (!userId) {
    c.status(401);
    return c.json({ message: 'Not authorized' });
  }

  const note = await getNoteById(noteId, userId);
  if (!note) {
    c.status(404);
    return c.json({ message: 'Note not found' });
  }

  return c.json({ note });
}

export async function deleteNoteHandler(c: Context) {
  const noteId = c.req.param('id');
  const userId = c.get('userId') as string;
  if (!userId) {
    c.status(401);
    return c.json({ message: 'Not authorized' });
  }

  const note = await getNoteById(noteId, userId);
  if (!note) {
    c.status(404);
    return c.json({ message: 'Note not found' });
  }

  await deleteNote(noteId, userId);

  return c.json({ message: 'Note deleted!' });
}
