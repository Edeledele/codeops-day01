const out = document.querySelector("#facts");
const form = document.querySelector("#search-form");
const input = document.querySelector("#country-input");

// NOTE: restcountries.com/v3.1 is deprecated (as of 2026) and now returns an
// error payload instead of data; its replacement, v5, requires a paid API key.
// countries.dev is a free, keyless drop-in replacement with an almost
// identical response shape, so it's used here instead. See README.md.
const API_BASE = "https://countries.dev";

/**
 * Appends a label/value row to a container using createElement (no innerHTML
 * string-building for the data itself).
 */
function renderRow(container, label, value) {
  const row = document.createElement("div");
  row.className = "fact-row";

  const labelEl = document.createElement("span");
  labelEl.className = "fact-label";
  labelEl.textContent = label;

  const valueEl = document.createElement("span");
  valueEl.className = "fact-value";
  valueEl.textContent = value;

  row.append(labelEl, valueEl);
  container.appendChild(row);
}

function renderCountry(country) {
  out.innerHTML = "";
  out.classList.remove("loading", "error");

  const header = document.createElement("div");
  header.className = "country-header";

  if (country.flags && country.flags.png) {
    const flag = document.createElement("img");
    flag.src = country.flags.png;
    flag.alt = `Flag of ${country.name}`;
    header.appendChild(flag);
  }

  const title = document.createElement("h2");
  title.textContent = country.name;
  header.appendChild(title);

  out.appendChild(header);

  const capital = country.capital || "N/A";
  const population = country.population.toLocaleString();
  const region = country.region || "N/A";
  const currencies = Array.isArray(country.currencies) && country.currencies.length
    ? country.currencies
        .map((c) => `${c.name} (${c.symbol || "—"})`)
        .join(", ")
    : "N/A";

  renderRow(out, "Capital", capital);
  renderRow(out, "Population", population);
  renderRow(out, "Region", region);
  renderRow(out, "Currencies", currencies);
}

function renderError(message) {
  out.innerHTML = "";
  out.classList.remove("loading");
  out.classList.add("error");
  out.textContent = message;
}

function renderLoading() {
  out.innerHTML = "";
  out.classList.remove("error");
  out.classList.add("loading");
  out.textContent = "Loading…";
}

async function showCountry(name) {
  renderLoading();

  try {
    const res = await fetch(`${API_BASE}/name/${encodeURIComponent(name)}`);

    if (!res.ok) {
      throw new Error("Country not found");
    }

    const data = await res.json();
    const [country] = data;

    if (!country) {
      throw new Error("Country not found");
    }

    renderCountry(country);
  } catch (err) {
    // Covers both network failures (fetch rejects) and the res.ok check above
    if (err instanceof TypeError) {
      renderError("Network error — please check your connection and try again.");
    } else {
      renderError(err.message || "Something went wrong.");
    }
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = input.value.trim();
  if (name) {
    showCountry(name);
  }
});

// Default to Ethiopia on first load
showCountry("ethiopia");