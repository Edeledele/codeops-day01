# Day 19 - DOM Manipulation Practice

This project is part of my CodeOps Full Stack Software Development training.

In this exercise, I practiced using JavaScript to work with the DOM (Document Object Model). I learned how to select HTML elements, change content, create new elements, and respond to user actions.

## What I Practiced

### 1. Changing Text and Classes
I used `textContent` to change the text of an element.

I also used `classList.toggle()` to add and remove a CSS class when the button is clicked.

### 2. Creating Elements
I created a list of Ethiopian cities using JavaScript.

The cities are:
- Addis Ababa
- Gondar
- Bahir Dar

I used `createElement()` and `appendChild()` to add the cities to the page.

### 3. Event Bubbling
I practiced event bubbling by adding click events to a button and its parent `<div>`.

When the button is clicked, both event listeners can run because the event moves from the button to its parent.

### 4. Event Delegation
I created a list with delete buttons.

Instead of adding a separate event listener to every delete button, I used one listener on the `<ul>`.

When a delete button is clicked, the related list item is removed.

### 5. Form Submission
I created a small form where the user can type something and add it to a list.

I used:
- `preventDefault()` to stop the page from refreshing
- `input.value` to get the text
- `createElement()` to create a new list item
- `appendChild()` to add it to the list
- `trim()` to remove extra spaces
- Clearing the input after adding an item

## Files

- `index.html` - The HTML structure of the page
- `script.js` - JavaScript DOM manipulation and events
- `style.css` - Styling for the page

## Technologies Used

- HTML5
- CSS3
- JavaScript
- DOM Manipulation
- Event Listeners

## What I Learned

From this exercise, I learned how JavaScript can interact with HTML elements and make a webpage more interactive.

I practiced:
- Selecting elements
- Changing text
- Adding and removing classes
- Creating HTML elements with JavaScript
- Event bubbling
- Event delegation
- Handling form submissions

## Author

Genet Tilahun

