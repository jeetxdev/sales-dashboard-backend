import { decimal, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  price: decimal().notNull(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  category: text().notNull(),
  subcategory: text().notNull(),
  description: text().notNull(),
  rating: decimal(),
  manufacturer: text().notNull(),
  stock: integer().notNull().default(0),
});
