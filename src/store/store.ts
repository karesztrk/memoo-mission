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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
