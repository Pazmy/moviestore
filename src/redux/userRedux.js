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
    updateLibrary: (state, action) => {
      action.payload.forEach((data) => {
        state.currentUser.library.push(data);
      });
    },
  },
});
export const { login, logout, updateUserAvatar, updateLibrary } =
  userSlice.actions;
export default userSlice.reducer;
