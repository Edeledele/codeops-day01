

// ---------- Step 1: Read bill & partySize, convert to Number ----------
const args = process.argv.slice(2);

const bill = Number(args[0]);
const partySize = Number(args[1]);
const method = (args[2] || "telebirr").toLowerCase();

if (!bill || bill <= 0 || !partySize || partySize <= 0) {
  console.log("Usage: node tip.js <bill> <partySize> [telebirr|cbebirr]");
  process.exit(1);
}

// ---------- Step 2: Tiered tip ----------

let tipRate;
if (bill < 500) {
  tipRate = 0.10;
} else {
  tipRate = 0.15;
}
const tip = bill * tipRate;

// ---------- Step 3: Service fee via switch (payment provider) ----------
let serviceFee = 0;
switch (method) {
  case "telebirr":
    serviceFee = bill * 0.015; 
    break;
  case "cbebirr":
    serviceFee = bill * 0.01; 
    break;
  default:
    console.log(`Unknown payment method "${method}", no service fee applied.`);
    serviceFee = 0;
}

// ---------- Step 4: Compute total & per-person amount ----------
const total = bill + tip + serviceFee;
const perPerson = total / partySize;

// ---------- Step 5: Template literal message ----------
const message = `
----- TeleBirr Tip & Split Calculator -----
Bill:            ${bill.toFixed(2)} ETB
Tip (${(tipRate * 100).toFixed(0)}%):        ${tip.toFixed(2)} ETB
Service Fee (${method}): ${serviceFee.toFixed(2)} ETB
Total:           ${total.toFixed(2)} ETB
Party Size:      ${partySize}
Per Person:      ${perPerson.toFixed(2)} ETB
--------------------------------------------
`;

console.log(message);