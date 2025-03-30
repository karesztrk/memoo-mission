import { createSlice } from "@reduxjs/toolkit";
import { start } from "./gameSlice";

export interface UserState {
  userName: string;
}

const initialState: UserState = {
  userName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(start, (state, action) => {
      const { username } = action.payload;
      state.userName = username;
    });
  },
});

export default userSlice.reducer;
