import Link from "next/link";
import { getAllOrders } from "../../lib/orders";

export const metadata = {
  title: "Kitchen Dashboard",
};

export default async function KitchenPage({ searchParams }) {
  const params = await searchParams;
  const sort = params.sort || "createdAt";
  const orderDirection = params.dir === "asc" ? 1 : -1;
  const page = parseInt(params.page || "1", 10);
  const pageSize = 5;

  const orders = getAllOrders();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const ordersPerDay = orders.reduce((acc, order) => {
    const day = order.createdAt.split("T")[0];
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  const dailyData = Object.entries(ordersPerDay).sort(([a], [b]) => a.localeCompare(b));

  const sortedOrders = [...orders].sort((a, b) => {
    if (a[sort] < b[sort]) return -1 * orderDirection;
    if (a[sort] > b[sort]) return 1 * orderDirection;
    return 0;
  });

  const totalPages = Math.ceil(sortedOrders.length / pageSize) || 1;
  const pagedOrders = sortedOrders.slice((page - 1) * pageSize, page * pageSize);

  const getSortLink = (column) => {
    const nextDir = sort === column && params.dir !== "asc" ? "asc" : "desc";
    return `/kitchen?sort=${column}&dir=${nextDir}&page=${page}`;
  };

  const getPageLink = (p) => {
    return `/kitchen?sort=${sort}&dir=${params.dir || "desc"}&page=${p}`;
  };

  return (
    <main className="kitchen-page" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Kitchen Dashboard</h1>
        <a href="/api/export" download className="primary-link" style={{ padding: '0.5rem 1rem', background: 'blue', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          Export CSV
        </a>
      </div>
      <p>Total Revenue: {totalRevenue} ETB</p>

      <section style={{ height: '300px', border: '1px solid #ccc', marginBottom: '2rem' }}>
        <h2>Orders Per Day</h2>
        {dailyData.length === 0 ? (
          <p>No data to display.</p>
        ) : (
          <svg viewBox="0 0 500 200" width="100%" height="100%">
             <text x="10" y="20">SVG Chart Placeholder</text>
          </svg>
        )}
      </section>

      <table style={{ marginBottom: '2rem', width: '100%', borderCollapse: 'collapse' }}>
        <caption>Orders Per Day Data</caption>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Date</th>
            <th style={{ textAlign: 'right', borderBottom: '1px solid #ccc' }}>Orders</th>
          </tr>
        </thead>
        <tbody>
          {dailyData.length === 0 ? (
            <tr><td colSpan="2">No orders</td></tr>
          ) : (
            dailyData.map(([date, count]) => (
              <tr key={date}>
                <td style={{ borderBottom: '1px solid #eee' }}>{date}</td>
                <td style={{ textAlign: 'right', borderBottom: '1px solid #eee' }}>{count}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <caption>Recent Orders</caption>
        <thead>
          <tr>
            <th aria-sort={sort === "id" ? (params.dir === "asc" ? "ascending" : "descending") : "none"} style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>
              <Link href={getSortLink("id")}>ID</Link>
            </th>
            <th aria-sort={sort === "name" ? (params.dir === "asc" ? "ascending" : "descending") : "none"} style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>
              <Link href={getSortLink("name")}>Customer</Link>
            </th>
            <th aria-sort={sort === "status" ? (params.dir === "asc" ? "ascending" : "descending") : "none"} style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>
              <Link href={getSortLink("status")}>Status</Link>
            </th>
            <th aria-sort={sort === "total" ? (params.dir === "asc" ? "ascending" : "descending") : "none"} style={{ textAlign: 'right', borderBottom: '2px solid #ccc' }}>
              <Link href={getSortLink("total")}>Total (ETB)</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {pagedOrders.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '1rem' }}>No orders found.</td>
            </tr>
          ) : (
            pagedOrders.map(order => (
              <tr key={order.id}>
                <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>#{order.id}</td>
                <td style={{ borderBottom: '1px solid #eee' }}>{order.name}</td>
                <td style={{ borderBottom: '1px solid #eee' }}>{order.status}</td>
                <td style={{ textAlign: 'right', borderBottom: '1px solid #eee' }}>{order.total} ETB</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        {page > 1 && <Link href={getPageLink(page - 1)}>← Previous</Link>}
        <span>Page {page} of {totalPages}</span>
        {page < totalPages && <Link href={getPageLink(page + 1)}>Next →</Link>}
      </div>
    </main>
  );
}
