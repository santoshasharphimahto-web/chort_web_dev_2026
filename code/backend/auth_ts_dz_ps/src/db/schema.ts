import { pgTable, uuid, varchar, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: varchar('first_name', { length: 45 }).notNull(),
  lastName: varchar('last_name', { length: 45 }),
  email: varchar('email', { length: 322 }).notNull().unique(),
  password: varchar('password', { length: 66 }).notNull(),
  salt: text('salt'), 
  
  // Galti yahan thi: Line ke aakhir mein se faltu ka ') hata diya hai
  emailVerified: boolean('email_verified').default(false).notNull(), 
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
});