import { getDishById } from "../app/menu/dishes";

const store = (globalThis.__orders ??= { orders: [], nextId: 1 });

export function validateOrder(body) {
  const fieldErrors = {};

  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, fieldErrors: { body: "Body must be a JSON object." } };
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (name.length < 2 || name.length > 60) {
    fieldErrors.name = "Name must be 2 to 60 characters.";
  }

  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  if (!/^\+?[0-9\s-]{7,15}$/.test(phone)) {
    fieldErrors.phone = "Enter a valid phone number (7 to 15 digits).";
  }

  const items = [];
  if (!Array.isArray(body.items) || body.items.length === 0) {
    fieldErrors.items = "Order must contain at least one item.";
  } else {
    for (const raw of body.items) {
      const id = String(raw?.id ?? "");
      const quantity = raw?.quantity;

      if (!getDishById(id)) {
        fieldErrors.items = `Unknown dish id "${id}".`;
        break;
      }
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
        fieldErrors.items = "Each quantity must be a whole number from 1 to 20.";
        break;
      }
      items.push({ id, quantity });
    }
  }

  if (Object.keys(fieldErrors).length > 0) return { ok: false, fieldErrors };
  return { ok: true, value: { name, phone, items } };
}

export function createOrder(ownerId, { name, phone, items }) {
  const lines = items.map(({ id, quantity }) => {
    const dish = getDishById(id);
    return { id, name: dish.name, price: dish.price, quantity };
  });

  const order = {
    id: String(store.nextId++),
    ownerId,
    name,
    phone,
    items: lines,
    total: lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  store.orders.push(order);
  return order;
}

export function getOrder(id) {
  return store.orders.find((o) => o.id === id);
}

export function listOrdersFor(ownerId) {
  return store.orders.filter((o) => o.ownerId === ownerId);
}

export function getAllOrders() {
  return store.orders;
}