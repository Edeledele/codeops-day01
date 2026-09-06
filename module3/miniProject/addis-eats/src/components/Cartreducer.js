export function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const alreadyInCart = state.items.some((d) => d.id === action.dish.id);
      if (alreadyInCart) return state;
      return { items: [...state.items, action.dish] };
    }

    case "remove":
      return { items: state.items.filter((d) => d.id !== action.id) };

    case "clear":
      return { items: [] };

    default:
      throw new Error("Unknown cart action: " + action.type);
  }
}

export const initialCartState = { items: [] };