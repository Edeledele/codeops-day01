// ==============================================
// Day 18 Exercises 1-4
// (Exercise 5 is split across money.js / app.js, run separately)
// ==============================================

console.log("--- Exercise 1: map / filter / reduce on ETB prices ---");

const prices = [200, 850, 1200, 500, 999, 50];

// Rounded to 2 decimal places to avoid floating-point noise (e.g. 229.99999999999997)
const round2 = (n) => Math.round(n * 100) / 100;

const pricesWithVat = prices.map((price) => round2(price * 1.15));
console.log("prices with 15% VAT:", pricesWithVat);

const underThousand = pricesWithVat.filter((price) => price < 1000);
console.log("VAT-inclusive prices under 1000:", underThousand);

const grandTotal = underThousand.reduce((sum, price) => sum + price, 0);
console.log("grand total of those:", grandTotal);

console.log("\n--- Exercise 2: Object.entries + for...of ---");

const customer = {
  name: "Selam Tesfaye",
  city: "Addis Ababa",
  balance: 1450,
};

for (const [key, value] of Object.entries(customer)) {
  console.log(`${key}: ${value}`);
}

console.log("\n--- Exercise 3: destructuring ---");

// Destructure name and city from customer in one line
const { name, city } = customer;
console.log("Destructured:", name, "-", city);

// Function using parameter destructuring
function greet({ name }) {
  return `Hello, ${name}!`;
}
console.log(greet(customer));

console.log("\n--- Exercise 4: spread to update without mutating ---");

const updatedCustomer = {
  ...customer,
  city: "Adama",
  phone: "0912345678",
};

console.log("original customer:", customer);
console.log("updated copy:", updatedCustomer);
console.log(
  "original mutated? ",
  customer.city === "Addis Ababa" && customer.phone === undefined
    ? "no, original is unchanged"
    : "YES -- bug!"
);