# Habesha Eatery

A responsive restaurant website I built using just HTML and CSS (no frameworks) for the Week 1 project in the CodeOps Frontend module.

## About This Project

For this project I had to design and build a responsive website for a real-world type of business, so I picked a restaurant — Habesha Eatery, based in Bole, Addis Ababa. The goal was to practice writing clean, semantic HTML and get comfortable with responsive layouts using Flexbox and CSS Grid, without relying on any CSS frameworks like Bootstrap.

I tried to make it feel like an actual small-business website rather than just a class exercise, so I focused on things like a proper hero section, a menu people could actually browse, and a working reservation form.

## What I Built

- A layout that works from small phones (360px) all the way up to desktop (1280px), using a mobile-first approach
- A sticky navbar built with Flexbox (logo on the left, nav links on the right)
- A hero section with fluid text sizing using `clamp()` so I didn't have to write a media query just for font sizes
- An About section telling the restaurant's story
- A menu section using CSS Grid with `auto-fit` and `minmax()` so the cards reflow automatically depending on screen width
- A reservation form with labeled inputs and some validation styling
- A footer with the address, phone number, and opening hours
- Small hover transitions on buttons/links
- A `prefers-reduced-motion` media query so the animations turn off for people who have that setting on

## Page Sections

1. **Navbar** — sticky, logo + nav links
2. **Hero** — welcome message and a call-to-action button
3. **About** — restaurant story/history
4. **Menu** — grid of dishes, responsive
5. **Reservation form** — name, email, date, party size, etc.
6. **Footer** — address, phone, hours

## Tech I Used

- HTML5
- CSS3 (Flexbox, Grid, CSS Variables)
- Media queries for the responsive breakpoints
- Vanilla JavaScript (`script.js`) for form validation on the contact page

## File Structure

```
day15_mini_project/
├── index.html      → homepage (navbar, hero, about, menu, reservation form, footer)
├── contact.html    → contact page (message form, opening hours, find us)
├── styles.css       → all my CSS
├── script.js         → contact form validation
└── README.md
```

## How to View It


1. Download/clone the folder
2. Open `index.html` in your browser



## Breakpoints I Tested

| Screen size | What I was checking |
|---|---|
| 360px | Small phones |
| 768px | Tablets |
| 1280px | Desktop |

## Accessibility Notes

I tried to keep accessibility in mind while building this:
- Used proper semantic tags (`header`, `nav`, `main`, `footer`, `address`) instead of just divs everywhere
- Added a "skip to main content" link
- Labeled every form field and marked required fields clearly
- Respected `prefers-reduced-motion`
- Checked color contrast on text and buttons

## Notes / What I'd Improve Next

- Hook the form up to an actual backend instead of just validating on the front end
- Add a real embedded map to the "Find Us" section
- Replace the placeholder phone number and email with real ones

## Author

Made by me for the CodeOps Frontend module, Week 1.