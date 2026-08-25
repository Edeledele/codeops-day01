

Writing
💱 Birr Watch

A lightweight single-page web app for tracking live Ethiopian Birr (ETB) exchange rates, converting ETB to other currencies, and maintaining a persistent currency watchlist.

No framework. No build step. Just HTML, CSS, and JavaScript.

✨ Features
📡 Live exchange rates — Fetches the latest ETB exchange rates when the app starts.
⏳ Loading state — Displays a clear loading message while rates are being fetched.
⚠️ Error handling — Shows a user-friendly error message if the API request fails.
💱 Currency conversion — Converts a valid ETB amount into any available currency.
✅ Input validation — Rejects empty, zero, negative, and non-numeric amounts with an inline error.
⭐ Currency watchlist — Add currencies you want to monitor.
🚫 No duplicates — A currency can only appear once in the watchlist.
🗑️ Remove currencies — Easily remove currencies from your watchlist.
📭 Empty state — Displays a helpful message when no currencies are being watched.
💾 Persistent state — Saves your watchlist and last-used currency to localStorage.
🔄 Automatic restoration — Restores saved preferences when the app is reloaded.
🧠 Single source of truth — The UI is rendered entirely from a single state object rather than reading values back from the DOM.
🌐 API

Birr Watch uses the free endpoint provided by ExchangeRate-API
.

Endpoint:

https://open.er-api.com/v6/latest/ETB


The endpoint returns the latest exchange rates with ETB as the base currency.

No API key is required.

🚀 Getting Started
Option 1: Open directly

Simply open index.html in your browser.

No installation or build process is required.

Note: Some browsers may block fetch() requests from a file:// URL.

Option 2: Run a local server

If your browser blocks the API request, start a simple local server from the project directory:

python3 -m http.server


Then open:

http://localhost:8000

📁 Project Structure
birr-watch/
├── index.html    # Page structure and markup
├── styles.css    # Application styling
└── app.js        # State, rendering, events, API calls, and persistence

index.html

Contains the application's structure and semantic markup.

styles.css

Contains all visual styling and layout rules.

app.js

Handles the application's core functionality:

Application state
API requests
Currency conversion
Input validation
Watchlist management
Event handling
Rendering
localStorage persistence
🧠 State Management

The application uses a single state object as its source of truth.

The UI is generated from the current state rather than querying the DOM to determine application data. This keeps the application logic predictable and makes state changes easier to manage.

The state includes information such as:

Current exchange rates
Loading and error status
Selected currency
Converted amount
Watchlist currencies
User input and validation state

User preferences are persisted using the browser's localStorage.

💾 Persistence

Birr Watch stores the following preferences locally:

Watchlist currencies
Last-used currency

When the application starts, these values are restored automatically if they exist.

No account or backend database is required.

🛠️ Technologies
HTML5
CSS3
Vanilla JavaScript
Fetch API
ExchangeRate-API
localStorage
🔒 Privacy

Birr Watch does not require an account or collect personal information.

The watchlist and saved currency preference remain in your browser's localStorage.

Exchange-rate data is fetched from the external ExchangeRate-API service.

⚠️ Notes

Exchange rates are live data and may change over time.

The application depends on the availability of the ExchangeRate-API endpoint and the browser's ability to make the request.
