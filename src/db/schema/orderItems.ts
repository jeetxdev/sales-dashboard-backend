import {decimal, integer, pgTable} from "drizzle-orm/pg-core";
import {orders} from "./orders";
import {products} from "./products";

export const orderItems = pgTable("order_items", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    order_id: integer().notNull().references(() => orders.id, {
        onDelete: "cascade",
    }),
    product_id: integer().notNull().references(() => products.id,{
        onDelete:"no action"
    }),
    quantity: integer().notNull().default(1),
    amount: decimal().notNull().default("0.00"),
})