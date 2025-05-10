import { pgEnum } from 'drizzle-orm/pg-core';

export const orderStatus = pgEnum('order_status', [
  'processing',
  'shipped',
  'out_for_delivery',
  'delivered',
  'cancelled',
]);

export const paymentMethods = pgEnum('payment_methods', [
  'credit_card',
  'debit_card',
  'UPI',
  'cash',
  'net_banking',
]);
export const paymentStatus = pgEnum('payment_status', ['pending', 'success', 'failed']);
