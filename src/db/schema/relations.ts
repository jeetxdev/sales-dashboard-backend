import { relations } from 'drizzle-orm';
import { users } from './users';
import { orders } from './orders';
import { products } from './products';
import { transactions } from './transactions';
import { orderItems } from './orderItems';

export const userRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}));

export const orderRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.user_id],
    references: [users.id],
  }),
  items: many(orderItems),
  transactions: many(transactions),
}));

export const orderItemRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.order_id],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.product_id],
    references: [products.id],
  }),
}));

export const productRelations = relations(products, ({ many }) => ({
  orderItems: many(orderItems),
}));

export const transactionRelations = relations(transactions, ({ one }) => ({
  orders: one(orders, {
    fields: [transactions.order_id],
    references: [orders.id],
  }),
}));
