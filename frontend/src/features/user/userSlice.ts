import { createSlice } from "@reduxjs/toolkit";
import { TOKEN_KEY_NAME } from "../../utils/values";

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
    clearUser() {
      localStorage.setItem(TOKEN_KEY_NAME, "");
      return initialState;
    },
  },
});

export const { setCurrentUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
