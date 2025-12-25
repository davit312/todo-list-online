import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import type { User } from "../../types/user";

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
      return initialState;
    },
  },
});

export const useUser = function () {
  const user = useSelector((store: RootState): User => store.user);
  if (!user) throw new Error("Error fetching user from store");
  return user;
};

export const { setCurrentUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
