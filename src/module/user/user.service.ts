import { tokens, type TokenType, users, type UserType } from '~/lib/schema';
import { db } from '~/lib/db';
import { eq } from 'drizzle-orm';
import { type UpdateUserType } from './user.validator';

export async function findUserById(id: string): Promise<UserType | undefined> {
  const dbUsers = await db.select().from(users).where(eq(users.id, id));

  return dbUsers[0];
}

export async function findTokenByHash(hash: string): Promise<TokenType | undefined> {
  const dbTokens = await db.select().from(tokens).where(eq(tokens.hash, hash));

  return dbTokens[0];
}

export async function findAllUsers(): Promise<UserType[]> {
  const dbUsers = await db.select().from(users);
  return dbUsers;
}

export async function findUserByEmail(email: string): Promise<UserType | undefined> {
  const dbUser = await db.select().from(users).where(eq(users.email, email));

  return dbUser[0];
}

export async function updateUser(id: string, updatedUser: UpdateUserType): Promise<UserType | undefined> {
  const { username, email } = updatedUser;
  const updates = Object.entries({ username, email }).filter(([_, value]) => value !== undefined);

  if (updates.length === 0) {
    return findUserById(id);
  }

  const updatedUserData = Object.fromEntries(updates) as Partial<UserType>;

  const dbUser = await db.update(users).set(updatedUserData).where(eq(users.id, id)).returning();

  return dbUser[0];
}

//TODO check!
export async function deleteUser(id: string): Promise<UserType | undefined> {
  const deletedUser = await db.delete(users).where(eq(users.id, id)).returning();
  return deletedUser[0];
}
