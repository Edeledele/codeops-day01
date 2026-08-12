// ==============================================
// money.js
// A small module of money-related helpers.
// ==============================================

const VAT = 0.15; // 15% VAT rate

/**
 * Adds VAT to a base amount.
 * @param {number} amount - the pre-VAT amount in ETB
 * @returns {number} amount with VAT added, rounded to 2 decimal places
 */
function addVat(amount) {
  return Math.round(amount * (1 + VAT) * 100) / 100;
}

module.exports = { addVat, VAT };