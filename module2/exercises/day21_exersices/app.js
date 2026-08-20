/* ---------- 1 & 2. Generic localStorage array helpers ---------- */
// save(key, arr): stringifies an array and writes it to localStorage.
function save(key, arr) {
  try {
    localStorage.setItem(key, JSON.stringify(arr));
    return true;
  } catch (err) {
    console.error(`save() failed for key "${key}":`, err);
    return false;
  }
}

// load(key): reads and parses an array from localStorage.
// Returns [] if the key is missing, null, or the stored value is corrupt.
function load(key) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn(`load() found corrupt data for key "${key}", resetting.`, err);
    return [];
  }
}

/* ---------- Translations for the language toggle ---------- */
const translations = {
  en: {
    brandName: "Addis Makers Meetup",
    langToggleLabel: "አማ / EN",
    themeDark: "Dark",
    themeLight: "Light",
    eyebrow: "Monthly gathering · Bole, Addis Ababa",
    headline: "Reserve your seat at the table",
    subhead: "Tell us who you are and how to reach you. We'll save your spot.",
    nameLabel: "Full name",
    phoneLabel: "Phone number",
    phoneHint: "Ethiopian mobile: 09XXXXXXXX or +2519XXXXXXXX",
    submitLabel: "Save my seat",
    errorName: "Please enter a name with at least 2 characters.",
    errorPhone: "Enter a valid Ethiopian phone number, like 0912345678.",
    countText: (n) => `${n} ${n === 1 ? "person has" : "people have"} signed up`
  },
  am: {
    brandName: "አዲስ ሜከርስ ስብሰባ",
    langToggleLabel: "EN / አማ",
    themeDark: "ጨለማ",
    themeLight: "ብርሃን",
    eyebrow: "ወርሃዊ ስብሰባ · ቦሌ, አዲስ አበባ",
    headline: "ቦታዎን ያስያዙ",
    subhead: "እርስዎ ማን እንደሆኑ እና እንዴት ልናገኝዎት እንደምንችል ይንገሩን።",
    nameLabel: "ሙሉ ስም",
    phoneLabel: "ስልክ ቁጥር",
    phoneHint: "የኢትዮጵያ ስልክ: 09XXXXXXXX ወይም +2519XXXXXXXX",
    submitLabel: "ቦታዬን አስቀምጥ",
    errorName: "እባክዎ ቢያንስ 2 ፊደላት ያለው ስም ያስገቡ።",
    errorPhone: "ትክክለኛ የኢትዮጵያ ስልክ ቁጥር ያስገቡ፣ ለምሳሌ 0912345678።",
    countText: (n) => `${n} ሰዎች ተመዝግበዋል`
  }
};

/* ---------- 1. Theme + language toggle, persisted with localStorage ---------- */
const THEME_KEY = "preferredTheme";
const LANG_KEY = "preferredLang";

const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");
const langToggle = document.getElementById("langToggle");

let currentLang = "en";

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  const t = translations[currentLang];
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  themeLabel.textContent = theme === "dark" ? t.themeLight : t.themeDark;
  // Button shows the action you'd take next, so label the *other* mode.
}

function applyLanguage(lang) {
  currentLang = lang;
  root.setAttribute("lang", lang);
  const t = translations[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });
  // Theme label depends on language too, so refresh it.
  const theme = root.getAttribute("data-theme");
  themeLabel.textContent = theme === "dark" ? t.themeLight : t.themeDark;
  renderCount();
}

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});

langToggle.addEventListener("click", () => {
  const next = currentLang === "en" ? "am" : "en";
  applyLanguage(next);
  localStorage.setItem(LANG_KEY, next);
});

/* ---------- 3–6. Signup form ---------- */
const SIGNUPS_KEY = "signups";
const form = document.getElementById("signupForm");
const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const errorArea = document.getElementById("errorArea");
const countText = document.getElementById("countText");

// Ethiopian mobile numbers: 09XXXXXXXX (10 digits) or +2519XXXXXXXX.
const ETHIOPIAN_PHONE_REGEX = /^(?:\+2519\d{8}|09\d{8})$/;

function showError(message) {
  errorArea.textContent = message;
}

function clearError() {
  errorArea.textContent = "";
}

function renderCount() {
  const signups = load(SIGNUPS_KEY);
  countText.textContent = translations[currentLang].countText(signups.length);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearError();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const t = translations[currentLang];

  // Validate in order; show only the first problem found.
  if (name.length < 2) {
    showError(t.errorName);
    return;
  }
  if (!ETHIOPIAN_PHONE_REGEX.test(phone)) {
    showError(t.errorPhone);
    return;
  }

  const signups = load(SIGNUPS_KEY);
  signups.push({ name, phone, signedUpAt: new Date().toISOString() });
  save(SIGNUPS_KEY, signups);

  form.reset();
  renderCount();
});

/* ---------- Restore saved preferences and count on load ---------- */
(function init() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  const savedLang = localStorage.getItem(LANG_KEY) || "en";

  applyLanguage(savedLang);
  applyTheme(savedTheme);
  renderCount();
})();