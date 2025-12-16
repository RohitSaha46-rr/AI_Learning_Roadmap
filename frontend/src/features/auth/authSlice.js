import { createSlice } from "@reduxjs/toolkit";

const userData = JSON.parse(localStorage.getItem("authUser"));

const initialState = {
  user: userData?.user || null,
  token: userData?.token || null,
  isAuthenticated: userData ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // Save user after login/signup
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      localStorage.setItem(
        "authUser",
        JSON.stringify({ user, token })
      );
    },

    // Logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("authUser");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
