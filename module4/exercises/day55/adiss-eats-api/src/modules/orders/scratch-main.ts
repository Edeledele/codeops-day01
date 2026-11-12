
import {
  Order,
  InMemoryOrderRepository,
  OrderService,
  OrderNotFoundError,
  PaymentDeclinedError,
} from "./index";

// Sample order
const orders: Order[] = [
  {
    id: 1,
    customerName: "Abebe",
    phone: "0912345678",
    area: "Bole",
    dishes: [
      {
        id: 1,
        name: "Doro Wot",
        priceSantim: 45000,
        quantity: 2,
      },
    ],
    status: "PENDING",
    totalSantim: 90000,
  },
];

// Create repository
const repository = new InMemoryOrderRepository(orders);

// Create service
const service = new OrderService(repository);

// Find order
console.log("Find order:", service.find(1));

// Get all orders
console.log("All orders:", repository.all());

// Get delivery fees
console.log("Fees by area:", service.feesByArea());

// Summarise customer names
console.log(
  "Customer names:",
  service.summarise("customerName")
);

// Summarise order statuses
console.log(
  "Order statuses:",
  service.summarise("status")
);

// Test OrderNotFoundError
try {
  service.find(99);
} catch (error: unknown) {
  if (error instanceof OrderNotFoundError) {
    console.log(error.name);
    console.log(error.message);
    console.log("Missing ID:", error.id);
  } else {
    console.error("Unexpected error:", error);
  }
}

// Test PaymentDeclinedError
const paymentError = new PaymentDeclinedError(
  "0912345678",
  "Insufficient balance"
);

console.log(paymentError.name);
console.log(paymentError.message);
console.log(paymentError.phone);
console.log(paymentError.reason);
