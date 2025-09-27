// import { configureStore } from "@reduxjs/toolkit";
// import stadiumReducer from "../features/stadium/stadiumSlice";
// import bookingReducer from "../features/booking/bookingSlice";
// import userReducer from "../features/user/userSlice";
// import authReducer from "../features/loginAuth/authSlice";
// export const store = configureStore({
//   reducer: {
//     stadiums: stadiumReducer,
//     bookings: bookingReducer,
//     user: userReducer,
//     auth: authReducer,
//   },
// });
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});
