import { eq, and } from 'drizzle-orm';
import { db } from '~/lib/db';
import { notes, type NoteType } from '~/lib/schema';
import { type NoteValidator } from './note.validator';
import { nanoid } from 'nanoid';
import { log } from '~/lib/logger';

export async function getNoteById(id: string, userId: string): Promise<NoteType | undefined> {
  const dbNote = await db
    .select()
    .from(notes)
    .where(and(eq(notes.id, id), eq(notes.user_id, userId)));

  return dbNote[0];
}

export async function insertNote(note: NoteValidator, userId: string): Promise<NoteType> {
  const { content, title, icon, status } = note;

  const dbNote = await db
    .insert(notes)
    .values({
      id: nanoid(),
      content,
      title,
      icon,
      status,
      user_id: userId,
    })
    .returning();

  return dbNote[0];
}
export async function deleteNote(id: string, userId: string): Promise<void> {
  await db.delete(notes).where(and(eq(notes.id, id), eq(notes.user_id, userId)));
}

export async function getAllUserNotes(userId: string): Promise<NoteType[] | undefined> {
  const dbNotes = await db.select().from(notes).where(eq(notes.user_id, userId));

  if (dbNotes.length === 0) {
    return undefined;
  }

  return dbNotes;
}

// export function updateNote() {}
