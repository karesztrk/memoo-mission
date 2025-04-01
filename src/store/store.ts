import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import userReducer from "./userSlice";
import cardSlice from "./cardSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer,
    card: cardSlice,
  },
});

export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Assign the store to the global object ... so it's available between islands
if (typeof window !== "undefined") {
  window.__REDUX_STORE__ = store;
}

/**
 * The global store.
 */
export const getStore = (): Store => {
  if (typeof window !== "undefined") {
    return window.__REDUX_STORE__;
  }
  return store;
};

/**
 * Subscribe to the global store and call the provided callback whenever the store changes.
 */
export const subscribeToStore = <T>(selector: (state: RootState) => T, callback: (value: T) => void) => {
  let previousState: unknown;

  return getStore().subscribe(() => {
    const state = getStore().getState();
    const newSelectedState = selector(state);

    if (newSelectedState !== previousState) {
      previousState = newSelectedState;
      callback(newSelectedState);
    }
  });
};
