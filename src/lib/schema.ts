import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  username: text('username').unique(),
  email: text('email').unique(),
  password: text('password').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const tokens = pgTable('tokens', {
  hash: text('hash').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  expiry: timestamp('expiry').notNull(),
  scope: text('scope').notNull(),
});

export type UserType = InferSelectModel<typeof users>;
export type UserInsertType = InferInsertModel<typeof users>;

export type TokenType = InferSelectModel<typeof tokens>;
export type TokenInsertType = InferInsertModel<typeof tokens>;
