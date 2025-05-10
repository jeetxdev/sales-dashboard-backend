import {char, integer, pgTable, text, timestamp} from "drizzle-orm/pg-core";
import {users} from "./users";
import {orderStatus} from "./enums";

export const orders = pgTable("orders", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer().notNull().references(() => users.id, {
        onDelete: "cascade",
    }).notNull(),
    shipping_address: text().notNull(),
    shipping_country: char({length: 2}).notNull(),
    created_at: timestamp({withTimezone: true}).notNull().defaultNow(),
    status: orderStatus().notNull().default('processing'),
});