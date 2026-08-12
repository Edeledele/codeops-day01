//Build a TeleBirr tip & split calculator
// Steps
// • Read bill and partySize; convert the bill with Number().
// • Add a 10% tip when the bill is over 300 ETB, else 5%.
// • Compute the total and the per-person amount.
// • Print a clear message with a template literal.
// • Use a switch to add a TeleBirr / CBE Birr service fee.

const bill = "350";
const partySize = 4;
const paymentMethod = "telebirr";

const billAmount = Number(bill);

const tipRate = billAmount > 300 ? 0.10 : 0.05;
const tip = billAmount * tipRate;

let serviceFee = 0;
switch (paymentMethod) {
  case "telebirr":
    serviceFee = billAmount * 0.01;
    break;
  case "cbebirr":
    serviceFee = billAmount * 0.015;
    break;
  case "cash":
    serviceFee = 0;
    break;
  default:
    console.log(`Unknown payment method "${paymentMethod}" — no service fee applied.`);
}

const total = billAmount + tip + serviceFee;
const perPerson = total / partySize;

console.log(`Bill: ${billAmount.toFixed(2)} ETB`);
console.log(`Tip (${(tipRate * 100).toFixed(0)}%): ${tip.toFixed(2)} ETB`);
console.log(`Service fee (${paymentMethod}): ${serviceFee.toFixed(2)} ETB`);
console.log(`Total: ${total.toFixed(2)} ETB`);
console.log(`Split ${partySize} ways: ${perPerson.toFixed(2)} ETB per person`);