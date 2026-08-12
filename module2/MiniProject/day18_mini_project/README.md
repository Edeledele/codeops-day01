# TeleBirr Transaction Report 💳

A small report generator built with JavaScript over a list of TeleBirr transactions for an Addis Ababa shop.

The project demonstrates **ES modules, filter(), map(), reduce(), destructuring, and the spread operator**. The logic is split across separate files so each file has one clear responsibility.

## What I Used

- JavaScript
- Node.js
- ES Modules
- import / export
- filter()
- map()
- reduce()
- Object destructuring
- Spread operator
- Pure functions
- Template literals

## Project Files

```text
day18_exercises/
│
├── transactions.js
├── report.js
├── app.js
├── package.json
├── sample-output.txt
└── README.md
````

## Files

### transactions.js

This file contains the transaction data.

It exports the `transactions` array. Each transaction contains:

* `id`
* `customer`
* `amount`
* `type`

The transaction type is either:

* `"credit"`
* `"debit"`

This file only provides data. It does not perform calculations or use `console.log()`.

### report.js

This file contains the report logic.

It exports three pure functions.

#### totalByType(txns, type)

Uses `filter()` to select transactions by type and `reduce()` to calculate the total amount in ETB.

#### formatReceipts(txns)

Uses `map()` to create formatted receipt messages.

It also uses object destructuring to access:

* `id`
* `customer`
* `amount`
* `type`

#### correctAmount(txn, newAmount)

Uses the spread operator to create a new transaction object without modifying the original transaction.

```javascript
export const correctAmount = (txn, newAmount) => ({
  ...txn,
  amount: newAmount,
});
```

### app.js

This is the main entry point of the application.

It:

* Imports the transaction data
* Imports the report functions
* Calculates transaction totals
* Displays the receipts
* Corrects a transaction amount
* Shows that the original transaction was not changed

All `console.log()` statements are kept in this file.

### package.json

The project uses ES modules.

The `package.json` file contains:

```json
{
  "type": "module"
}
```

This allows Node.js to use `import` and `export` in `.js` files.

### sample-output.txt

This file contains a saved example of the program output for reference.

## How to Run

Make sure Node.js is installed.

Open the project folder in VS Code or a terminal.


## JavaScript Concepts Practiced

### filter()

Used to select transactions based on their type.

```javascript
txns.filter((txn) => txn.type === type);
```

### reduce()

Used to calculate the total transaction amount.

```javascript
txns.reduce((sum, txn) => sum + txn.amount, 0);
```

### map()

Used to create formatted receipt messages.

```javascript
txns.map((txn) => {
  // format receipt
});
```

### Destructuring

Used to extract transaction properties directly.

```javascript
({ id, customer, amount, type })
```

### Spread Operator

Used to create a new object without changing the original.

```javascript
{
  ...txn,
  amount: newAmount
}
```

## Why the Original Transaction Isn't Mutated

The `correctAmount()` function uses the spread operator:

```javascript
export const correctAmount = (txn, newAmount) => ({
  ...txn,
  amount: newAmount,
});
```

The spread operator copies the properties of the original transaction into a new object.

Then the `amount` property is replaced with the new amount.

The original transaction remains unchanged.

For example:

```javascript
const original = {
  id: 3,
  customer: "Tigist",
  amount: 180,
  type: "debit"
};

const corrected = correctAmount(original, 200);
```

The result is:

```text
Original amount:  180 ETB
Corrected amount: 200 ETB
```

The original object still contains `180` ETB.

## What I Learned

This project helped me understand how to:

* Create and use ES modules
* Separate data from application logic
* Use `import` and `export`
* Use `filter()` to select data
* Use `map()` to transform data
* Use `reduce()` to calculate totals
* Use object destructuring
* Use the spread operator
* Avoid mutating original objects
* Write reusable pure functions
* Organize JavaScript projects into multiple files
* Use Node.js with ES modules

## About the Project

This project was created as part of my **CodeOps JavaScript learning program**. It helped me practice modern JavaScript array methods, object handling, ES modules, and clean code organization.

## Future Improvements

In the future, I would like to:

* Add more transaction types
* Add transaction search and filtering
* Add date and time to transactions
* Generate monthly reports
* Add customer transaction history
* Export reports to CSV or PDF
* Build a simple web interface

## Author

**Genet Tilahun**

BSc in Computer Science
Full-Stack Web Development Student

