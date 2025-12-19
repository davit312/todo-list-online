import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullname: "A user",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateFullname(state, action) {
      state.fullname = action.payload;
    },
  },
});

export const { updateFullname } = userSlice.actions;

export default userSlice.reducer;
