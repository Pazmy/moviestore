import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    updateUserAvatar: (state, action) => {
      state.currentUser.avatarpath = action.payload;
    },
  },
});
export const { login, logout, updateUserAvatar } = userSlice.actions;
export default userSlice.reducer;
