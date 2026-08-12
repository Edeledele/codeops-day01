// ==============================================
// Demo: Loyalty Points Module
// ==============================================


const { createLoyalty, holidayEarnRule } = require("./loyalty.js");

console.log("--- Standard card (1 point per 10 ETB) ---");
const card = createLoyalty();

card.earn(250); // +25 points
console.log("After earning on 250 ETB, balance:", card.balance()); // 25

card.redeem(10);
console.log("After redeeming 10 points, balance:", card.balance()); // 15

card.redeem(9999); // try to over-redeem
console.log("After over-redeeming, balance (should not go below 0):", card.balance()); // 0

console.log("\n--- Proving the balance is private ---");
console.log("card.points (direct access attempt):", card.points); // undefined
// There is no `points` property on the returned object -- only the closure
// created inside createLoyalty() can see the real variable.

console.log("\n--- Holiday card (double points) ---");
const holiday = createLoyalty(holidayEarnRule);
holiday.earn(250); // 25 * 2 = 50 points
console.log("Holiday card after earning on 250 ETB, balance:", holiday.balance()); // 50

console.log("\n--- Custom one-off earn rule (swapped in) ---");
const flatRateCard = createLoyalty((etb) => Math.floor(etb / 5)); // 1 point per 5 ETB
flatRateCard.earn(250);
console.log("Flat-rate card after earning on 250 ETB, balance:", flatRateCard.balance()); // 50

console.log("\n--- Each card keeps its own independent private balance ---");
console.log("card:", card.balance());
console.log("holiday:", holiday.balance());
console.log("flatRateCard:", flatRateCard.balance());