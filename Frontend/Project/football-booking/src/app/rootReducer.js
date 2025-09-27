// src/app/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import stadiumReducer from "../features/stadium/stadiumSlice";
import bookingReducer from "../features/booking/bookingSlice";
import userReducer from "../features/user/userSlice";
import authReducer from "../features/loginAuth/authSlice";

const appReducer = combineReducers({
  stadiums: stadiumReducer,
  bookings: bookingReducer,
  user: userReducer,
  auth: authReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
