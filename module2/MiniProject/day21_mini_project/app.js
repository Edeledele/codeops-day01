// app.js
// Validated, persistent signup form.
// Brings together: regex validation, DOM forms, JSON, and localStorage.

const STORAGE_KEY = "signupEntries";
const PHONE = /^(?:\+251|0)9\d{8}$/;

const form = document.getElementById("signup-form");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const errorArea = document.getElementById("error-area");
const successArea = document.getElementById("success-area");
const entryList = document.getElementById("entry-list");
const emptyMessage = document.getElementById("empty-message");

/**
 * Validate a name and phone number.
 * Returns an error message string, or "" if valid.
 */
function validate(name, phone) {
  if (name.trim().length < 2) {
    return "Enter your full name (at least 2 characters).";
  }
  if (!PHONE.test(phone.trim())) {
    return "Enter a valid Ethiopian phone number (e.g. 0912345678 or +251912345678).";
  }
  return "";
}

/**
 * Normalize a phone number so that 0912345678 and +251912345678
 * are recognized as the same number when comparing entries.
 */
function normalizePhone(phone) {
  return phone.trim().replace(/^\+251/, "0");
}

/**
 * Read all saved entries from localStorage.
 * Handles the "nothing saved yet" case and corrupt/invalid JSON safely,
 * always returning an array.
 */
function loadEntries() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw === null) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.warn("Saved signup data was not an array. Resetting.");
      return [];
    }
    return parsed;
  } catch (err) {
    console.warn("Saved signup data was corrupt JSON. Resetting.", err);
    return [];
  }
}

/**
 * Persist the given array of entries to localStorage as JSON.
 */
function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/**
 * Remove duplicate entries (same normalized phone number) from an array,
 * keeping the last occurrence of each phone number.
 */
function dedupeEntries(entries) {
  const seen = new Map();
  entries.forEach((entry) => {
    seen.set(normalizePhone(entry.phone), entry);
  });
  return Array.from(seen.values());
}

/**
 * One-time cleanup: remove any duplicates already sitting in localStorage
 * (e.g. from before duplicate-checking was added) and re-render.
 */
function dedupeExisting() {
  const entries = dedupeEntries(loadEntries());
  saveEntries(entries);
  renderEntries(entries);
}

/**
 * Render the current list of entries into the page.
 */
function renderEntries(entries) {
  entryList.textContent = "";

  if (entries.length === 0) {
    emptyMessage.style.display = "block";
    return;
  }

  emptyMessage.style.display = "none";

  entries.forEach((entry, index) => {
    const li = document.createElement("li");

    const nameSpan = document.createElement("span");
    nameSpan.className = "name";
    nameSpan.textContent = entry.name;

    const phoneSpan = document.createElement("span");
    phoneSpan.className = "phone";
    phoneSpan.textContent = entry.phone;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "Remove";
    removeBtn.setAttribute("aria-label", `Remove ${entry.name}`);
    removeBtn.addEventListener("click", () => handleRemove(index));

    li.appendChild(nameSpan);
    li.appendChild(phoneSpan);
    li.appendChild(removeBtn);
    entryList.appendChild(li);
  });
}

/**
 * Clear any previously shown error or success message.
 */
function clearMessages() {
  errorArea.textContent = "";
  successArea.textContent = "";
}

/**
 * Remove a single entry (by its index in the current list) and
 * persist + re-render the updated list.
 */
function handleRemove(index) {
  const entries = loadEntries();
  entries.splice(index, 1);
  saveEntries(entries);
  renderEntries(entries);
}

function handleSubmit(event) {
  event.preventDefault();
  clearMessages();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  const errorMessage = validate(name, phone);
  if (errorMessage) {
    errorArea.textContent = errorMessage;
    return;
  }

  const entries = loadEntries();
  const normalizedPhone = normalizePhone(phone);
  const existingIndex = entries.findIndex(
    (entry) => normalizePhone(entry.phone) === normalizedPhone
  );

  if (existingIndex !== -1) {
    // Same phone number already saved — update the name instead of duplicating.
    entries[existingIndex] = { name, phone };
    successArea.textContent = "Signup updated.";
  } else {
    entries.push({ name, phone });
    successArea.textContent = "Signup saved.";
  }

  saveEntries(entries);
  renderEntries(entries);

  form.reset();
  nameInput.focus();
}

function init() {
  form.addEventListener("submit", handleSubmit);

  // Clean up any duplicates left over from before this fix existed.
  dedupeExisting();
}

init();