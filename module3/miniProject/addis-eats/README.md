# Addis Eats

A static Ethiopian restaurant menu, built the React way.

## Run it

```
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## How it's put together

- `src/data/dishes.js` — the menu as an array of plain objects (`id`, `name`, `description`, `price`). This is the only place you'd edit to add a dish.
- `src/components/Dish.jsx` — a reusable component. It takes `name`, `description`, and `price` as props and renders one menu row.
- `src/components/Header.jsx` — the restaurant's name and tagline.
- `src/App.jsx` — composes `Header` plus the menu, looping over `dishes` with `.map()` to render one `<Dish>` per entry. Each one gets `key={dish.id}` — a stable id from the data, not the array index, so React can track rows correctly if the list ever changes.
- `src/index.css` — all styling, using plain `className`s (no CSS frameworks).

## Where state comes in later

Right now this is fully static — the array never changes after the page loads. Day 27 is where you'd add `useState` for things like a cart or an "Add" button, which is why `Dish` doesn't have any click handlers yet.
