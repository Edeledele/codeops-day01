// Addis Market — shopping list
// Pure DOM: selection, element creation, events and delegation.
// No framework, no storage yet — that lands later this week.

const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const errorEl = document.querySelector("#form-error");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");
const emptyState = document.querySelector("#empty-state");

let nextId = 1;

// ---------------------------------------------------------------
// Building a row with createElement + append (never innerHTML for
// list content, so existing rows are never rebuilt from a string).
// ---------------------------------------------------------------
function buildRow(id, name, price) {
  const li = document.createElement("li");
  li.className = "item";
  li.dataset.id = id;
  li.dataset.price = price; // raw number, used by updateTotal
  li.tabIndex = 0; // toggling is a keyboard-reachable action too

  const nameEl = document.createElement("span");
  nameEl.className = "item-name";
  nameEl.textContent = name;

  const priceEl = document.createElement("span");
  priceEl.className = "item-price";
  priceEl.textContent = `${price.toFixed(2)} ETB`;

  const delBtn = document.createElement("button");
  delBtn.type = "button";
  delBtn.className = "del";
  delBtn.textContent = "Remove";
  delBtn.setAttribute("aria-label", `Remove ${name}`);

  li.append(nameEl, priceEl, delBtn);
  return li;
}

function addRow(name, price) {
  const row = buildRow(nextId++, name, price);
  list.append(row);
}

// ---------------------------------------------------------------
// Running total — recalculated from whatever rows currently exist
// in the DOM, so it always reflects adds and deletes.
// ---------------------------------------------------------------
function updateTotal() {
  const rows = list.querySelectorAll(".item");
  let sum = 0;
  rows.forEach((row) => {
    sum += Number(row.dataset.price) || 0;
  });
  totalEl.textContent = `${sum.toFixed(2)} ETB`;
  emptyState.classList.toggle("hidden", rows.length > 0);
}

// ---------------------------------------------------------------
// Form: add an item, with preventDefault + validation.
// ---------------------------------------------------------------
function setInvalid(input, invalid) {
  input.classList.toggle("invalid", invalid);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const price = Number(priceInput.value);

  const nameOk = name.length > 0;
  const priceOk = priceInput.value.trim() !== "" && !Number.isNaN(price) && price >= 0;

  setInvalid(nameInput, !nameOk);
  setInvalid(priceInput, !priceOk);

  if (!nameOk || !priceOk) {
    errorEl.textContent = "Add an item name and a price in ETB before adding it to the list.";
    return;
  }

  errorEl.textContent = "";
  addRow(name, price);
  updateTotal();

  form.reset();
  nameInput.focus();
});

// Clear the invalid state as soon as the person starts fixing a field.
nameInput.addEventListener("input", () => setInvalid(nameInput, false));
priceInput.addEventListener("input", () => setInvalid(priceInput, false));

// ---------------------------------------------------------------
// Single delegated listener on the list container handles both
// deleting a row and toggling its "bought" state.
// ---------------------------------------------------------------
list.addEventListener("click", (e) => {
  const delBtn = e.target.closest(".del");
  if (delBtn) {
    delBtn.closest(".item").remove();
    updateTotal();
    return;
  }

  const row = e.target.closest(".item");
  if (row) {
    row.classList.toggle("bought");
  }
});

// Keyboard support for toggling a focused row (Enter / Space),
// routed through the same delegated handler pattern.
list.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const row = e.target.closest(".item");
  if (!row) return;
  e.preventDefault();
  row.classList.toggle("bought");
});

// Initial paint.
updateTotal();