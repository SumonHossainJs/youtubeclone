import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie"; // Import Cookies from react-cookie

const cookies = new Cookies(); // Create an instance of Cookies

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    subscription: (state, action) => {
      if (state.currentUser.subscribedUser.includes(action.payload)) {
        state.currentUser.subscribedUser.splice(
          state.currentUser.subscribedUser.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.subscribedUser.push(action.payload);
      }
    },
    checkAccessTokenCookie: (state) => {
      const accessToken = cookies.get("access_token"); // Use get 
      
      const allCookies = cookies.getAll();
      console.log(allCookies);

      if (!accessToken) {
        // If access_token cookie does not exist, clear the current user
        state.currentUser = null;
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  subscription,
  checkAccessTokenCookie,
} = userSlice.actions;

export default userSlice.reducer;
