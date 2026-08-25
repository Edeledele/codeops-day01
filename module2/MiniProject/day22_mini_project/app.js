// ---------------------------------------------------------------------------
// Birr Watch — state -> render -> events
// ---------------------------------------------------------------------------

const RATES_URL = "https://open.er-api.com/v6/latest/ETB";
const STORAGE_KEY = "birr-watch:v1";

// -----------------------------
// State
// -----------------------------
const state = {
  rates: {},          // e.g. { USD: 0.0177, KES: 2.29, ... }
  status: "loading",  // "loading" | "ready" | "error"
  errorMessage: "",
  currency: "USD",    // last-selected currency for the converter
  watchlist: [],       // array of currency codes, e.g. ["USD", "KES"]
};

// -----------------------------
// DOM references
// -----------------------------
const statusEl = document.querySelector("#status");
const currencySelect = document.querySelector("#currency");
const watchlistCurrencySelect = document.querySelector("#watchlist-currency");
const watchlistAddBtn = document.querySelector("#watchlist-add-btn");
const watchlistEl = document.querySelector("#watchlist");
const convertForm = document.querySelector("#convert-form");
const amountInput = document.querySelector("#amount");
const convertErrorEl = document.querySelector("#convert-error");
const convertResultEl = document.querySelector("#convert-result");

// -----------------------------
// Persistence (localStorage)
// -----------------------------
function loadPersisted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (Array.isArray(saved.watchlist)) {
      state.watchlist = saved.watchlist;
    }
    if (typeof saved.currency === "string") {
      state.currency = saved.currency;
    }
  } catch (err) {
    // Corrupt or missing data — just start fresh, no console noise for the user.
    state.watchlist = [];
  }
}

function savePersisted() {
  const toSave = {
    watchlist: state.watchlist,
    currency: state.currency,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
}

// -----------------------------
// Render
// -----------------------------
function render() {
  renderStatus();
  renderCurrencyOptions();
  renderWatchlist();
}

function renderStatus() {
  statusEl.className = "status";
  if (state.status === "loading") {
    statusEl.classList.add("loading");
    statusEl.textContent = "Loading live rates…";
  } else if (state.status === "error") {
    statusEl.classList.add("error");
    statusEl.textContent = state.errorMessage || "Something went wrong loading rates.";
  } else {
    statusEl.textContent = "";
  }
}

function renderCurrencyOptions() {
  const codes = Object.keys(state.rates).sort();

  const optionsHtml = codes
    .map((code) => `<option value="${code}">${code}</option>`)
    .join("");

  currencySelect.innerHTML = optionsHtml;
  watchlistCurrencySelect.innerHTML = optionsHtml;

  if (codes.length === 0) {
    currencySelect.disabled = true;
    watchlistCurrencySelect.disabled = true;
    watchlistAddBtn.disabled = true;
    return;
  }

  currencySelect.disabled = false;
  watchlistCurrencySelect.disabled = false;
  watchlistAddBtn.disabled = false;

  // Restore last-selected currency if it's still a valid option.
  if (codes.includes(state.currency)) {
    currencySelect.value = state.currency;
  } else {
    state.currency = currencySelect.value;
  }
}

function renderWatchlist() {
  if (state.watchlist.length === 0) {
    watchlistEl.innerHTML = `<li class="empty">Your watchlist is empty. Add a currency above.</li>`;
    return;
  }

  watchlistEl.innerHTML = state.watchlist
    .map((code) => {
      const rate = state.rates[code];
      const rateText = typeof rate === "number" ? `1 ETB = ${rate} ${code}` : "rate unavailable";
      return `
        <li data-code="${code}">
          <span>
            <strong>${code}</strong>
            <span class="rate">${rateText}</span>
          </span>
          <button class="remove-btn" data-remove="${code}" type="button">Remove</button>
        </li>
      `;
    })
    .join("");
}

// -----------------------------
// Data loading
// -----------------------------
async function loadRates() {
  state.status = "loading";
  state.errorMessage = "";
  render();

  try {
    const response = await fetch(RATES_URL);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();

    if (!data.rates || typeof data.rates !== "object") {
      throw new Error("Unexpected response shape from rates API");
    }

    state.rates = data.rates;
    state.status = "ready";
  } catch (err) {
    state.status = "error";
    state.errorMessage = "Couldn't load exchange rates. Check your connection and try again.";
  }

  render();
}

// -----------------------------
// Conversion
// -----------------------------
function handleConvertSubmit(event) {
  event.preventDefault();
  convertErrorEl.textContent = "";
  convertResultEl.textContent = "";

  const rawAmount = amountInput.value.trim();
  const amount = Number(rawAmount);

  if (rawAmount === "" || Number.isNaN(amount)) {
    convertErrorEl.textContent = "Enter a valid number.";
    return;
  }
  if (amount <= 0) {
    convertErrorEl.textContent = "Amount must be greater than zero.";
    return;
  }

  const code = currencySelect.value;
  const rate = state.rates[code];
  if (typeof rate !== "number") {
    convertErrorEl.textContent = "Rate not available for that currency.";
    return;
  }

  const converted = amount * rate;
  convertResultEl.textContent = `${amount} ETB = ${converted.toFixed(4)} ${code}`;

  state.currency = code;
  savePersisted();
}

// -----------------------------
// Watchlist actions
// -----------------------------
function handleAddToWatchlist() {
  const code = watchlistCurrencySelect.value;
  if (!code) return;
  if (state.watchlist.includes(code)) return; // no duplicates

  state.watchlist.push(code);
  savePersisted();
  render();
}

function handleWatchlistClick(event) {
  const removeCode = event.target.getAttribute("data-remove");
  if (!removeCode) return;

  state.watchlist = state.watchlist.filter((code) => code !== removeCode);
  savePersisted();
  render();
}

// -----------------------------
// Wire up events
// -----------------------------
convertForm.addEventListener("submit", handleConvertSubmit);
watchlistAddBtn.addEventListener("click", handleAddToWatchlist);
watchlistEl.addEventListener("click", handleWatchlistClick);
currencySelect.addEventListener("change", () => {
  state.currency = currencySelect.value;
  savePersisted();
});

// -----------------------------
// Init
// -----------------------------
loadPersisted();
render();
loadRates();