// ==============================================
// transactions.js
// Responsible for: holding the raw transaction data.
// This module does no calculation and no formatting --
// it just models and exports the list of transactions.
// ==============================================

export const transactions = [
  { id: 1, customer: "Almaz", amount: 250, type: "debit" },
  { id: 2, customer: "Dawit", amount: 600, type: "credit" },
  { id: 3, customer: "Tigist", amount: 180, type: "debit" },
  { id: 4, customer: "Bereket", amount: 1200, type: "credit" },
  { id: 5, customer: "Selam", amount: 75, type: "debit" },
  { id: 6, customer: "Yonas", amount: 430, type: "credit" },
];