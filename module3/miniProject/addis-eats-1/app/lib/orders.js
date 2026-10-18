import fs from "fs";
import path from "path";

const ORDERS_FILE_PATH = path.join(process.cwd(), "data", "orders.json");

const ORDER_STAGES = [
  { key: "received", label: "Order Received", desc: "Received by kitchen" },
  { key: "preparing", label: "Kitchen Preparing", desc: "Simmering with authentic spices" },
  { key: "out_for_delivery", label: "Out for Delivery", desc: "Courier en route to your location" },
  { key: "delivered", label: "Delivered", desc: "Delivered! Melkam Mikig (Enjoy your meal)" },
];

function loadOrdersFromFile() {
  const map = new Map();
  try {
    if (fs.existsSync(ORDERS_FILE_PATH)) {
      const data = fs.readFileSync(ORDERS_FILE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        parsed.forEach((order) => {
          if (order && order.id) {
            map.set(order.id, order);
          }
        });
      }
    }
  } catch (e) {
    console.error("Error reading orders file:", e);
  }
  return map;
}

export function persistOrders() {
  try {
    const dir = path.dirname(ORDERS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const list = Array.from(globalOrders.values());
    fs.writeFileSync(ORDERS_FILE_PATH, JSON.stringify(list, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving orders file:", e);
  }
}

// Global in-memory store synchronized with data/orders.json
const globalOrders =
  globalThis.__addisEatsOrders || (globalThis.__addisEatsOrders = loadOrdersFromFile());

function seedDefaultOrders() {
  const fromFile = loadOrdersFromFile();
  for (const [key, val] of fromFile.entries()) {
    if (!globalOrders.has(key)) {
      globalOrders.set(key, val);
    }
  }

  let changed = false;
  if (!globalOrders.has("ord-101")) {
    globalOrders.set("ord-101", {
      id: "ord-101",
      userId: "usr_customer_1",
      customerName: "Abebe Bikila",
      phone: "0911234567",
      deliveryAddress: "Bole Medhanialem, House 412, Addis Ababa",
      deliveryZone: "Bole, Addis Ababa",
      items: [
        { id: "kitfo", name: "Kitfo", price: 350, quantity: 1 },
        { id: "doro-wot", name: "Doro Wot", price: 400, quantity: 1 },
        { id: "spris", name: "Addis Spris Juice", price: 150, quantity: 1 },
      ],
      subtotal: 900,
      deliveryFee: 50,
      total: 950,
      status: "preparing",
      estimatedMinutes: 20,
      driver: {
        name: "Dawit Haile",
        phone: "0922334455",
        vehicle: "Bajaj Express #34",
      },
      updatedAt: new Date().toISOString(),
      pollCount: 0,
    });
    changed = true;
  }

  if (!globalOrders.has("ord-102")) {
    globalOrders.set("ord-102", {
      id: "ord-102",
      userId: "usr_customer_2",
      customerName: "Bethlehem Assefa",
      phone: "0944556677",
      deliveryAddress: "CMC Towers, Addis Ababa",
      deliveryZone: "CMC, Addis Ababa",
      items: [
        { id: "shiro", name: "Shiro", price: 250, quantity: 2 },
      ],
      subtotal: 500,
      deliveryFee: 50,
      total: 550,
      status: "received",
      estimatedMinutes: 28,
      driver: {
        name: "Yohannes M.",
        phone: "0911998877",
        vehicle: "Delivery Van #12",
      },
      updatedAt: new Date().toISOString(),
      pollCount: 0,
    });
    changed = true;
  }

  if (changed) {
    persistOrders();
  }
}

seedDefaultOrders();

export async function getOrder(id) {
  seedDefaultOrders();
  if (!id) return null;
  const order = globalOrders.get(id);

  if (!order) {
    return null;
  }

  // Increment pollCount and timestamp
  order.pollCount = (order.pollCount || 0) + 1;
  order.lastPolledAt = new Date().toLocaleTimeString("en-GB", { hour12: false });

  return {
    ...order,
    stages: ORDER_STAGES,
  };
}

export async function advanceOrderStatus(id) {
  seedDefaultOrders();
  const order = globalOrders.get(id);
  if (!order) return null;

  const stageKeys = ORDER_STAGES.map((s) => s.key);
  const currentIndex = stageKeys.indexOf(order.status);
  const nextIndex = (currentIndex + 1) % stageKeys.length;

  order.status = stageKeys[nextIndex];
  order.updatedAt = new Date().toISOString();
  order.lastPolledAt = new Date().toLocaleTimeString("en-GB", { hour12: false });
  order.estimatedMinutes = Math.max(0, 25 - nextIndex * 8);
  persistOrders();

  return {
    ...order,
    stages: ORDER_STAGES,
  };
}

export async function resetOrderStatus(id) {
  seedDefaultOrders();
  const order = globalOrders.get(id);
  if (!order) return null;

  order.status = "received";
  order.updatedAt = new Date().toISOString();
  order.lastPolledAt = new Date().toLocaleTimeString("en-GB", { hour12: false });
  order.estimatedMinutes = 25;
  persistOrders();

  return {
    ...order,
    stages: ORDER_STAGES,
  };
}

export async function createOrder(orderData) {
  seedDefaultOrders();
  const newId = `ord-${Math.floor(100 + Math.random() * 900)}`;
  const order = {
    id: newId,
    userId: orderData.userId || null,
    customerName: orderData.customerName || "Customer",
    phone: orderData.phone || "0911000000",
    deliveryAddress: orderData.deliveryAddress || "Addis Ababa",
    deliveryZone: orderData.deliveryZone || "Addis Ababa",
    items: orderData.items || [],
    subtotal: orderData.subtotal || 0,
    deliveryFee: 50,
    total: (orderData.subtotal || 0) + 50,
    status: "received",
    estimatedMinutes: 30,
    driver: {
      name: "Dawit Haile",
      phone: "0922334455",
      vehicle: "Bajaj Express #34",
    },
    updatedAt: new Date().toISOString(),
    pollCount: 0,
  };

  globalOrders.set(newId, order);
  persistOrders();
  return order;
}

/**
 * Scoped query: returns ONLY orders matching the authenticated session's user ID.
 * Prevents horizontal privilege escalation (IDOR).
 */
export async function getUserOrders(userId) {
  seedDefaultOrders();
  if (!userId) return [];
  const results = [];
  for (const order of globalOrders.values()) {
    if (order.userId === userId) {
      results.push(order);
    }
  }
  return results.sort((a, b) => (b.id > a.id ? 1 : -1));
}

/**
 * Staff-only query: returns all system orders for kitchen & delivery dispatch.
 */
export async function getAllOrders() {
  seedDefaultOrders();
  return Array.from(globalOrders.values()).sort((a, b) => (b.id > a.id ? 1 : -1));
}

/**
 * Write action with strict session and ownership verification.
 * Only the owner of the order OR a staff member can cancel the order.
 */
export async function cancelOrderWithOwnershipCheck(orderId, sessionUser) {
  seedDefaultOrders();
  if (!sessionUser || !sessionUser.id) {
    throw new Error("Unauthorized: You must be signed in to perform this action.");
  }

  const order = globalOrders.get(orderId);
  if (!order) {
    throw new Error("Not Found: Order does not exist.");
  }

  // Ownership verification
  if (order.userId !== sessionUser.id && sessionUser.role !== "staff") {
    throw new Error("Forbidden: You do not own this order and lack staff privileges.");
  }

  order.status = "cancelled";
  order.updatedAt = new Date().toISOString();
  order.lastPolledAt = new Date().toLocaleTimeString("en-GB", { hour12: false });
  persistOrders();

  return order;
}

/**
 * Write action with ownership check to update delivery instructions
 */
export async function updateOrderNoteWithOwnershipCheck(orderId, note, sessionUser) {
  seedDefaultOrders();
  if (!sessionUser || !sessionUser.id) {
    throw new Error("Unauthorized: You must be signed in.");
  }

  const order = globalOrders.get(orderId);
  if (!order) {
    throw new Error("Not Found: Order does not exist.");
  }

  if (order.userId !== sessionUser.id && sessionUser.role !== "staff") {
    throw new Error("Forbidden: Ownership verification failed.");
  }

  order.kitchenNote = String(note || "").slice(0, 200);
  order.updatedAt = new Date().toISOString();
  persistOrders();
  return order;
}

