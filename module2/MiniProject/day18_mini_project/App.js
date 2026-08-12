// ==============================================
// app.js
// Responsible for: wiring the modules together and
// printing the report. All console output lives here --
// transactions.js and report.js stay side-effect free.
// ==============================================

import { transactions } from "./transactions.js";
import { totalByType, formatReceipts, correctAmount } from "./report.js";

console.log("========================================");
console.log(" TeleBirr Transaction Report — Addis Shop");
console.log("========================================\n");

// --- Totals by type (filter + reduce) ---
const totalDebits = totalByType(transactions, "debit");
const totalCredits = totalByType(transactions, "credit");

console.log(`Total Debits:  ${totalDebits} ETB`);
console.log(`Total Credits: ${totalCredits} ETB`);
console.log(`Net Movement:  ${totalCredits - totalDebits} ETB\n`);

// --- Receipts (map + destructuring) ---
console.log("--- Receipts ---");
const receipts = formatReceipts(transactions);
receipts.forEach((line) => console.log(line));

// --- Correcting a transaction without mutating the original (spread) ---
console.log("\n--- Correcting transaction #3 (Tigist: 180 -> 200 ETB) ---");
const original = transactions[2];
const corrected = correctAmount(original, 200);

console.log("original: ", original);
console.log("corrected:", corrected);
console.log(
  "original unchanged?",
  original.amount === 180 ? "yes" : "NO -- mutation bug!"
);