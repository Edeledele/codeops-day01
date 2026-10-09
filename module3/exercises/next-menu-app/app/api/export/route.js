import { getAllOrders } from "../../../lib/orders";

export async function GET() {
  const orders = getAllOrders();
  
  // CSV header
  let csv = 'ID,Name,Phone,Status,Total,Items,CreatedAt\n';
  
  for (const order of orders) {
    const escapeCsv = (str) => `"${String(str).replace(/"/g, '""')}"`;
    const itemsStr = order.items.map(i => `${i.quantity}x ${i.name}`).join('; ');
    
    csv += [
      order.id,
      escapeCsv(order.name),
      escapeCsv(order.phone),
      order.status,
      order.total,
      escapeCsv(itemsStr),
      order.createdAt
    ].join(',') + '\n';
  }

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="orders.csv"',
    },
  });
}
