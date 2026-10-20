import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";

const STORAGE_KEY = "tta-redux-state";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: { cart: cartReducer, favorites: favoritesReducer },
  preloadedState: loadState(),
});

// კალათა და ფავორიტები რჩება გვერდის განახლების შემდეგაც
store.subscribe(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
  } catch {
    /* localStorage მიუწვდომელია */
  }
});
