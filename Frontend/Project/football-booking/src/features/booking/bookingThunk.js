import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllBookingsByStadiumIDAPI,
  getAllBookingsByStadiumIDAndDateAPI,
  addNewBookingAPI,
  getAllBookingsByStadiumIDAndDateAndStatusIDAPI,
  getAllBookingsStatusAPI,
  getAllPendingBookingsByStadiumIDAPI,
  updateBookingStatusAPI,
  getOneTimeBookingsListByStadiumIDAndDateAPI,
  getConstantBookingsListByStadiumIDAndWeekDayAPI,
  getConstantBookingsListByStadiumIDAndWeekDayAndWeekNumberAPI,
  getAllBookingsByUserIDAndDateAndStatusIDAPI,
  addNewOneTimeBookingAPI,
  addConstantTimeBookingAPI,
  getUserConstantBookingsByStatusIDAPI,
  getUserOneTimeBookingsByStatusIDAPI,
  getConstantBookingsAPI,
  getOneTimeBookingsAPI,
} from "../../api/bookingAPI";
import { getUserToken } from "../../utils/global";
export const getBookingsByStadiumID = createAsyncThunk(
  "bookings/getBookingsByStadiumID",
  async (stadiumId) => {
    const data = await getAllBookingsByStadiumIDAPI(stadiumId);
    return data;
  }
);
export const getBookingsByStadiumAndDate = createAsyncThunk(
  "bookings/fetchByStadiumIdAndDate",
  async ({ stadiumId, choosedDate }) => {
    const data = await getAllBookingsByStadiumIDAndDateAPI({
      stadiumId,
      choosedDate,
    });
    return data;
  }
);
export const getBookingsByStadiumIDAndDateAndStatusID = createAsyncThunk(
  "bookings/getByStadiumIDAndDateAndStatusID",
  async ({ stadiumId, statusId, choosedDate }) => {
    const data = await getAllBookingsByStadiumIDAndDateAndStatusIDAPI({
      stadiumId,
      statusId,
      choosedDate,
    });
    return data;
  }
);
export const getPendingBookingsByStadiumID = createAsyncThunk(
  "bookings/getPendingByStadiumID",
  async ({ stadiumId }) => {
    const data = await getAllPendingBookingsByStadiumIDAPI({
      stadiumId,
    });
    return data;
  }
);
export const getBookingsByUserIDAndDateAndStatusID = createAsyncThunk(
  "bookings/getByUserIDAndDateAndStatusID",
  async ({ userID, statusId, choosedDate }) => {
    const data = await getAllBookingsByUserIDAndDateAndStatusIDAPI({
      userID,
      statusId,
      choosedDate,
    });
    return data;
  }
);
export const getOneTimeBookingsListByStadiumIDAndDate = createAsyncThunk(
  "bookings/getListByStadiumIDAndDate",
  async ({ stadiumId, choosedDate, duration }) => {
    const data = await getOneTimeBookingsListByStadiumIDAndDateAPI({
      stadiumId,
      choosedDate,
      duration,
    });
    return data;
  }
);
export const getConstantBookingsListByStadiumIDAndWeekDay = createAsyncThunk(
  "bookings/getConstantBookingsListByStadiumIDAndWeekDay",
  async ({ stadiumId, weekDay, duration }) => {
    const data = await getConstantBookingsListByStadiumIDAndWeekDayAPI({
      stadiumId,
      weekDay,
      duration,
    });
    return data;
  }
);
export const getConstantBookingsListByStadiumIDAndWeekDayAndWeekNumber =
  createAsyncThunk(
    "bookings/getConstantBookingsListByStadiumIDAndWeekDayAndWeekNumber",
    async ({ stadiumId, weekDay, weekNumber, duration }) => {
      const data =
        await getConstantBookingsListByStadiumIDAndWeekDayAndWeekNumberAPI({
          stadiumId,
          weekDay,
          weekNumber,
          duration,
        });
      return data;
    }
  );
export const getAllBookingsStatus = createAsyncThunk(
  "bookings/getAllBookingsStatus",
  async () => {
    const data = await getAllBookingsStatusAPI();
    return data;
  }
);
export const addNewBooking = createAsyncThunk(
  "bookings/addNewBooking",
  async (bookingData, thunkAPI) => {
    try {
      const response = await addNewBookingAPI(bookingData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addNewOneTimeBooking = createAsyncThunk(
  "bookings/addOneTimeNewBooking",
  async (newBooking, thunkAPI) => {
    try {
      const response = await addNewOneTimeBookingAPI(newBooking);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addConstantTimeBooking = createAsyncThunk(
  "bookings/addOneTimeNewBooking",
  async (bookingData, thunkAPI) => {
    try {
      const response = await addConstantTimeBookingAPI(bookingData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateBookingStatusByID = createAsyncThunk(
  "bookings/updateBookingStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateBookingStatusAPI(data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error updating booking status"
      );
    }
  }
);
export const getUserConstantBookingsByStatusID = createAsyncThunk(
  "bookings/getUserConstantBookingsByStatusID",
  async ({ statusID }) => {
    const data = await getUserConstantBookingsByStatusIDAPI(
      { statusID },
      {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
          "Content-Type": "application/json-patch+json",
        },
      }
    );
    return data;
  }
);
export const getUserOneTimeBookingsByStatusID = createAsyncThunk(
  "bookings/getUserOneTimeBookingsByStatusID",
  async ({ statusID }) => {
    const data = await getUserOneTimeBookingsByStatusIDAPI(
      { statusID },
      {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
          "Content-Type": "application/json-patch+json",
        },
      }
    );
    return data;
  }
);
export const getConstantBookings = createAsyncThunk(
  "bookings/getConstantBookings",
  async ({ stadiumId, weekDay, weekNumber, bookingStatusID }) => {
    const data = await getConstantBookingsAPI({
      stadiumId,
      weekDay,
      weekNumber,
      bookingStatusID,
    });
    return data;
  }
);
export const getOneTimeBookings = createAsyncThunk(
  "bookings/getConstantBookings",
  async ({ stadiumId, date, bookingStatusID }) => {
    const data = await getOneTimeBookingsAPI({
      stadiumId,
      date,
      bookingStatusID,
    });
    return data;
  }
);
