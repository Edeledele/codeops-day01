// ==============================================
// report.js
// Responsible for: all the summary logic --
// totaling by type, formatting receipts, and producing
// a corrected copy of a transaction. Pure functions only;
// no console output lives here (that's app.js's job).
// ==============================================

/**
 * Filters transactions down to one type, then reduces to a total.
 * @param {Array<object>} txns
 * @param {"credit"|"debit"} type
 * @returns {number} total ETB for that type
 */
export const totalByType = (txns, type) =>
  txns
    .filter((t) => t.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);

/**
 * Builds a list of formatted receipt strings, one per transaction.
 * Uses map with destructuring in the callback.
 * @param {Array<object>} txns
 * @returns {Array<string>}
 */
export const formatReceipts = (txns) =>
  txns.map(({ id, customer, amount, type }) => {
    const sign = type === "credit" ? "+" : "-";
    return `#${id} ${customer}: ${sign}${amount} ETB (${type})`;
  });

/**
 * Returns a NEW transaction object with a corrected amount, using spread.
 * The original transaction object is never mutated.
 * @param {object} txn - the original transaction
 * @param {number} newAmount - the corrected ETB amount
 * @returns {object} a new transaction object
 */
export const correctAmount = (txn, newAmount) => ({
  ...txn,
  amount: newAmount,
});