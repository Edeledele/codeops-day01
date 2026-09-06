// Plain function: (state, action) => newState. No React here at all,
// which is what makes it easy to test by calling it directly:
//
//   let state = [];
//   state = cartReducer(state, { type: "add", dish: { id: 1, name: "Tibs", price: 220 } });
//   state = cartReducer(state, { type: "remove", id: 1 });
//   state = cartReducer(state, { type: "clear" });

export function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.dish];
    case "remove":
      return state.filter((item) => item.id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}