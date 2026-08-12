// ==============================================
// app.js
// Imports the money module and puts it to use.
// ==============================================

const { addVat, VAT } = require("./money.js");

console.log("--- Exercise 5: money.js module used from app.js ---");
console.log(`VAT rate is ${VAT * 100}%`);

const prices = [200, 850, 1200, 500];

prices.forEach((price) => {
  console.log(`${price} ETB -> ${addVat(price)} ETB with VAT`);
});