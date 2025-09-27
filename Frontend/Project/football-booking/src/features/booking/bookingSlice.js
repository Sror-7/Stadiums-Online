import { createSlice } from "@reduxjs/toolkit";
import {
  handleAddNewBooking,
  handleGetBookingsByStadium,
  handleGetBookingsByStadiumAndDate,
  handleGetBookingsByStadiumAndDateAndStatus,
  handleUpdateBookingStatusByID,
  handleGetBookingsListByStadiumIDAndDate,
  handleGetBookingsByUserAndDateAndStatus,
} from "./bookingReducer";
const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    value: [],
    newBookingID: [],
    bookingsList: [],
    showBookingsList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    handleAddNewBooking(builder);
    handleGetBookingsByStadium(builder);
    handleGetBookingsByStadiumAndDate(builder);
    handleGetBookingsByStadiumAndDateAndStatus(builder);
    handleUpdateBookingStatusByID(builder);
    handleGetBookingsListByStadiumIDAndDate(builder);
    handleGetBookingsByUserAndDateAndStatus(builder);
  },
});

export const {} = bookingSlice.actions;
export default bookingSlice.reducer;
