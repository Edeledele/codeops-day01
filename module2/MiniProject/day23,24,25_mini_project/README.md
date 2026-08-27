Budget App

A simple and user-friendly budget tracker built with HTML, CSS, and vanilla JavaScript.

This app helps you keep track of your income and expenses, see your balance update automatically, and understand where your money is going. All your transactions are saved in your browser using localStorage, so your data stays available when you refresh the page.

Features
Add transactions — Add income or expenses with a description, amount, and date.
Expense categories — Organize your expenses into Food, Transport, Bills, Shopping, Entertainment, or Other.
Live financial summary — See your total income, total expenses, remaining balance, and savings rate.
Category breakdown — View your spending by category with simple animated bars.
Filter transactions — Switch between All, Income, and Expense transactions.
Delete transactions — Remove any transaction with one click.
Local storage — Your transactions are automatically saved in the browser.
Responsive design — The app works on both desktop and mobile devices.
Accessible modal — The transaction form can be closed using the close button, by clicking outside the modal, or by pressing the Esc key.
Project Structure
budget-app/
├── index.html       # Main page
├── styles.css       # Styling and responsive design
├── app.js           # App logic and data handling
├── about.html       # About page
├── contact.html     # Contact page
└── README.md        # Project documentation

Getting Started

Open the project and launch index.html in your browser.

Note: The app uses localStorage to save your transactions. For the best experience, run the project through a local development server.

How It Works

The main functionality of the app is handled by app.js.

When you add a transaction, it is stored in a JavaScript array and then saved to the browser's localStorage.

The app uses the following storage key:

budgetApp.transactions


Whenever you add or delete a transaction, the saved data is updated automatically.

When the app is opened again, the saved transactions are loaded from localStorage, so you don't lose your data after refreshing the page.

The app also calculates the following information automatically:

Total income
Total expenses
Remaining balance
Savings rate
Spending by category

All of these values are calculated from the transactions currently saved in the app.

Technologies Used
HTML5 — Used to create the structure of the pages.
CSS3 — Used for styling, layout, animations, and responsive design.
JavaScript — Used for the app's functionality, calculations, events, and data storage.
Google Fonts — Poppins is used for the text and overall design.
Pages
Home Page

The main page is where you can manage your budget. You can add transactions, view your financial summary, filter transactions, and see your spending breakdown.

About Page

The About page provides information about the purpose of the Budget App and what it can be used for.

Contact Page

The Contact page provides