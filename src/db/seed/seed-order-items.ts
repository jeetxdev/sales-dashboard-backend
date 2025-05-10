import db from '../index';
import { orders } from '../schema/orders';
import { and, gt, lte } from 'drizzle-orm';
import { products } from '../schema/products';
import { randomDecimal, randomInt } from './helpers';
import { orderItems } from '../schema/orderItems';

async function seedOrderItems() {
  const ordersList = await db
    .select({ id: orders.id })
    .from(orders)
    .where(and(gt(orders.id, 40000), lte(orders.id, 50000)));
  const productsList = await db
    .select({ id: products.id })
    .from(products)
    .where(and(gt(products.id, 0), lte(products.id, 6000)));

  if (ordersList.length === 0) {
    console.log('No orders found');
    return;
  }
  if (productsList.length === 0) {
    console.log('No products found');
    return;
  }
  const orderItemsData = ordersList.map((order) => ({
    order_id: order.id,
    product_id: productsList[randomInt(0, 5999)].id,
    quantity: randomInt(1, 10),
    amount: randomDecimal(1, 10000, 2),
  }));
  await db.insert(orderItems).values(orderItemsData);
  console.log(`${orderItemsData.length} Order Items seeded successfully`);
}

seedOrderItems();
