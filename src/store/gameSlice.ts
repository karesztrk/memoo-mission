import { createSlice } from "@reduxjs/toolkit";

type GameState = Record<string, unknown>;

const initialState: GameState = {};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
});

export default gameSlice.reducer;
