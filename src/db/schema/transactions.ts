import { decimal, integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { orders } from './orders';
import { paymentMethods, paymentStatus } from './enums';

export const transactions = pgTable('transactions', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  transaction_code: uuid().defaultRandom(),
  order_id: integer()
    .notNull()
    .references(() => orders.id, {
      onDelete: 'cascade',
    }),
  amount: decimal().notNull().default('0.00'),
  payment_method: paymentMethods().notNull().default('cash'),
  status: paymentStatus().notNull().default('pending'),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
