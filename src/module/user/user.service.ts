import { tokens, type TokenType, users, type UserType } from '~/lib/schema';
import { db } from '~/lib/db';
import { eq } from 'drizzle-orm';

export async function findUserById(id: string): Promise<UserType | undefined> {
  const dbUsers = await db.select().from(users).where(eq(users.id, id));

  return dbUsers[0];
}

export async function findTokenByHash(hash: string): Promise<TokenType | undefined> {
  const dbTokens = await db.select().from(tokens).where(eq(tokens.hash, hash));

  return dbTokens[0];
}

export async function findUserByEmail(email: string): Promise<UserType | undefined> {
  const dbUser = await db.select().from(users).where(eq(users.email, email));

  return dbUser[0];
}
