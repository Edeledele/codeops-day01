# Addis Market - Shopping List

This project is a simple shopping list application called Addis Market.

I created it as part of my JavaScript DOM practice. The project allows users to add items with prices, remove items, mark items as bought, and see the total price.

## What I Practiced

### 1. DOM Selection

I used JavaScript to select HTML elements using:

- `querySelector()`
- `querySelectorAll()`

This allowed me to work with the form, inputs, list, total, and other elements.

### 2. Creating HTML Elements

I used `createElement()` to create shopping list items.

Each item contains:

- Item name
- Price
- Remove button

I used `append()` to add the new elements to the page.

### 3. Adding Items

The user can enter an item name and price and click **Add to list**.

The JavaScript checks that:

- The item name is not empty.
- The price is a valid number.
- The price is not negative.

If everything is correct, the item is added to the list.

### 4. Removing Items

Each shopping item has a **Remove** button.

When the button is clicked, the item is removed from the list and the total price is updated.

### 5. Marking Items as Bought

I also added the ability to click on a shopping item to mark it as **bought**.

The item gets a different style and the name and price are crossed out.

The feature also works with the keyboard using:

- Enter
- Space

### 6. Event Delegation

Instead of adding an event listener to every shopping item, I used one event listener on the list.

This makes the code simpler and allows it to work with new items added later.

### 7. Calculating the Total

The total price is calculated from the items currently in the list.

When an item is added or removed, the total is updated automatically.

### 8. Form Validation

I used JavaScript validation to show an error when the user tries to add an invalid item.

The input also changes style when it contains an error.

## Design

The page uses an Ethiopian-inspired market style with colors inspired by:

- Coffee
- Berbere
- Teff
- Indigo
- Traditional tibeb patterns

The design is also responsive, so it works on smaller screens.

## Files

- `index.html` - Contains the structure of the shopping list.
- `App.js` - Contains the JavaScript functionality.
- `styles.css` - Contains the styling and responsive design.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- DOM Manipulation
- Event Listeners
- Event Delegation
- Form Validation

## What I Learned

This project helped me understand how JavaScript can make a webpage interactive.

I practiced creating elements, handling events, validating forms, updating the DOM, deleting elements, and calculating values from the page.

## Author

Genet Tilahun
