import { orders } from '../schema/orders';
import { transactions } from '../schema/transactions';
import db from '../index';
import { lte, and, gt, eq } from 'drizzle-orm';
import { orderItems } from '../schema/orderItems';

async function seedTransactions() {
  const ordersList = await db
    .select({ id: orders.id })
    .from(orders)
    .where(and(gt(orders.id, 40000), lte(orders.id, 50000)));
  if (ordersList.length === 0) {
    console.log('No orders found');
    return;
  }
  const emptyOrders: number[] = [];
  let count = 0;
  for (const order of ordersList) {
    const orderItemsList = await db
      .select({ amount: orderItems.amount })
      .from(orderItems)
      .where(eq(orderItems.order_id, order.id));
    if (orderItemsList.length === 0) {
      emptyOrders.push(order.id);
    } else {
      const totalOrderAmount = orderItemsList.reduce(
        (prev, curr) => prev + parseFloat(curr.amount),
        0
      );
      await db
        .update(transactions)
        .set({ amount: totalOrderAmount.toFixed(2) })
        .where(eq(transactions.order_id, order.id));
      count++;
    }
    console.log('Updated order: ', order.id);
  }
  console.log('emptyOrders', emptyOrders);
  console.log(`${count} Transactions updated successfully`);
  // const paymentMethod = ['credit_card', 'debit_card', 'UPI', 'cash', 'net_banking'] as const;
  // const paymentStatus = ['pending', 'success', 'failed'] as const;
  // const transactionData = ordersList.map(order =>
  //     ({
  //         order_id: order.id,
  //         amount: randomDecimal(1, 10000, 2),
  //         payment_method: paymentMethod[randomInt(0, 4)],
  //         status: paymentStatus[randomInt(0, 4)],
  //         transaction_code: crypto.randomUUID()
  //     })
  // )
  // await db.insert(transactions).values(transactionData);
  // console.log(`${transactionData.length} Transactions seeded successfully`);
}

seedTransactions();
