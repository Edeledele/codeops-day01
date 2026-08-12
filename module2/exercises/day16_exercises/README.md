# TeleBirr Tip & Split Calculator 💰

This is a simple **TeleBirr tip and bill-splitting calculator** that I created as a JavaScript practice project.

The program calculates the tip, payment service fee, total bill, and amount each person should pay.

## What I Used

* JavaScript
* Variables
* `Number()`
* Ternary Operator
* `switch` Statement
* Template Literals
* Arithmetic Operators
* `toFixed()`

## What the Program Includes

The calculator can:

* Read the bill amount
* Convert the bill using `Number()`
* Calculate a 10% tip when the bill is over 300 ETB
* Calculate a 5% tip when the bill is 300 ETB or less
* Add a TeleBirr service fee
* Add a CBE Birr service fee
* Support cash payment
* Calculate the total amount
* Split the bill between people
* Display the final results clearly

## Payment Methods

The program supports different payment methods:

* **TeleBirr:** 1% service fee
* **CBE Birr:** 1.5% service fee
* **Cash:** No service fee

The program uses a `switch` statement to select the correct service fee.

## Example

For a bill of **350 ETB** shared by **4 people** using **TeleBirr**:

* Bill: 350.00 ETB
* Tip: 35.00 ETB
* Service fee: 3.50 ETB
* Total: 388.50 ETB
* Each person: 97.13 ETB

## Project Files

```text
day16_exercises/
├── index.html
├── day10_tip_split.js
└── README.md
```

## How to Run

1. Download or clone the project.
2. Open the project folder.
3. Open the JavaScript file in VS Code.
4. Run the program using Node.js.

```text
node day10_tip_split.js
```

## About the Project

This project was created as an **in-class exercise** to practice JavaScript variables, type conversion, conditional operators, switch statements, calculations, and template literals.

## Future Improvements

In the future, I would like to add:

* User input for the bill
* User input for party size
* More payment methods
* A graphical user interface
* Input validation
* A web-based calculator
* Reset button

## Author

**Genet Tilahun**

BSc in Computer Science
Full-Stack Web Development Student
