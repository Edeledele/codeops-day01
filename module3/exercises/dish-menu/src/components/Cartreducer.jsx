
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