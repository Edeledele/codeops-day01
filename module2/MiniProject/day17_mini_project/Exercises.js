// ==============================================
// Day 17 Exercises
// ==============================================

console.log("--- Exercise 1: VAT function (default parameter) ---");

// Regular function with a default parameter
function vat(amount, rate = 0.15) {
  return amount * rate;
}

// Same logic as an arrow function with an implicit return
const vatArrow = (amount, rate = 0.15) => amount * rate;

console.log("vat(1000) =", vat(1000));
console.log("vat(1000, 0.10) =", vat(1000, 0.10));
console.log("vatArrow(1000) =", vatArrow(1000));
console.log("vatArrow(1000, 0.10) =", vatArrow(1000, 0.10));

console.log("\n--- Exercise 2: makeCounter closure ---");

function makeCounter() {
  let count = 0; // private variable, only reachable via the returned function
  return function () {
    count += 1;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3



console.log("\n--- Exercise 3: discountBy factory ---");

function discountBy(rate) {
  return function (price) {
    return price * (1 - rate);
  };
}

const memberPrice = discountBy(0.10); // 10% off
const salePrice = discountBy(0.30); // 30% off

console.log("memberPrice(1000) =", memberPrice(1000)); // 900
console.log("salePrice(1000) =", salePrice(1000)); // 700

console.log("\n--- Exercise 4: applyToAll higher-order function ---");

function applyToAll(list, fn) {
  return list.map(fn);
}

const prices = [100, 250, 1000, 4200];
const pricesWithVat = applyToAll(prices, (p) => p + vat(p));
console.log("prices:", prices);
console.log("prices with 15% VAT added:", pricesWithVat);

console.log("\n--- Exercise 5: forEach over Ethiopian cities ---");

const cities = ["Addis Ababa", "Bahir Dar", "Hawassa", "Mekelle", "Adama"];

cities.forEach((city, index) => {
  console.log(`${index + 1}. ${city}`);
});