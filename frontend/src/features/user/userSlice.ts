import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullname: "",
  email: "",
  id: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateFullname(state, action) {
      state.fullname = action.payload;
    },
    setCurrentUser(_, action) {
      return action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
