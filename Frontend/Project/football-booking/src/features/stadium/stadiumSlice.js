import { createSlice } from "@reduxjs/toolkit";
import { handleAddNewStadium } from "./stadiumReducer";
import { handleGetAllStadiums } from "./stadiumReducer";
import { handleGetStadiumInfoWithBookingsByID } from "./stadiumReducer";
import { handleGetStadiumInfoByID } from "./stadiumReducer";
const stadiumSlice = createSlice({
  name: "stadiums",
  initialState: {
    value: [],
    StadiumInfoWithBookings: [],
    OwnerStadium: {
      id: null,
      ownerID: null,
      name: "",
      location: "",
      description: "",
      isAvailable: false,
      phone: "",
      email: "",
      imageUrl: "",
      createdDate: null,
      bookingSettings: {
        id: null,
        stadiumID: null,
        isAvailableForBookings: false,
        pricePerHour: null,
        createdDate: null,
      },
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    handleAddNewStadium(builder);
    handleGetAllStadiums(builder);
    handleGetStadiumInfoWithBookingsByID(builder);
    handleGetStadiumInfoByID(builder);
  },
});

export const {} = stadiumSlice.actions;
export default stadiumSlice.reducer;
