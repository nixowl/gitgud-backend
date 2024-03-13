import { type TokenInsertType, tokens, type TokenType, users, type UserType } from '~/lib/schema';
import { type RegisterUserType } from '~/module/auth/auth.validator';
import { db } from '~/lib/db';
import { nanoid } from 'nanoid';
import argon2 from 'argon2';

export async function insertUser(user: RegisterUserType): Promise<UserType> {
  const { username, password, email } = user;

  const dbUser = await db
    .insert(users)
    .values({
      id: nanoid(),
      email,
      password,
      username,
    })
    .returning();

  // it always returns an array, so we select the first element ( and only element )
  return dbUser[0];
}

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return argon2.verify(hash, password);
}

export async function insertToken({ hash, scope, userId, expiry }: TokenInsertType): Promise<TokenType> {
  const token = await db
    .insert(tokens)
    .values({
      hash,
      scope,
      userId,
      expiry,
    })
    .returning();

  return token[0];
}


