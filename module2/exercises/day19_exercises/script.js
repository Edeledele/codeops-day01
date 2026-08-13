/* ============================================================
   1. Select an element, change its text with textContent,
      then toggle a CSS class with classList.toggle
   ============================================================ */
const greeting = document.getElementById("greeting");
const changeTextBtn = document.getElementById("changeTextBtn");

changeTextBtn.addEventListener("click", () => {
  greeting.textContent = "Text changed via textContent!";
  greeting.classList.toggle("highlighted");
});

/* ============================================================
   2. Given an array of three Ethiopian city names, create an
      <li> for each with createElement and append to a <ul>
   ============================================================ */
const ethiopianCities = ["Addis Ababa", "Gondar", "Bahir Dar"];
const cityList = document.getElementById("cityList");

ethiopianCities.forEach((city) => {
  const li = document.createElement("li");
  li.textContent = city;
  cityList.appendChild(li);
});

/* ============================================================
   3. Click listener on a button that logs event.target, plus a
      listener on a wrapping div to observe bubbling
   ============================================================ */
const bubbleBtn = document.getElementById("bubbleBtn");
const outerBox = document.getElementById("outerBox");

bubbleBtn.addEventListener("click", (event) => {
  console.log("Button listener — event.target:", event.target);
});

outerBox.addEventListener("click", (event) => {
  console.log("Outer div listener (bubbled) — event.target:", event.target);
});

/* ============================================================
   4. List of items with delete buttons, removed via a single
      delegated listener on the parent <ul>
   ============================================================ */
const deleteList = document.getElementById("deleteList");

deleteList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const item = event.target.closest("li");
    item.remove();
  }
});

/* ============================================================
   5. Form with a text input; on submit, preventDefault, read
      input.value, append to a list, then clear the field
   ============================================================ */
const addForm = document.getElementById("addForm");
const itemInput = document.getElementById("itemInput");
const formList = document.getElementById("formList");

addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = itemInput.value.trim();
  if (value === "") return;

  const li = document.createElement("li");
  li.textContent = value;
  formList.appendChild(li);

  itemInput.value = "";
});