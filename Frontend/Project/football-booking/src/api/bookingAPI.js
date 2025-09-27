import axios from "axios";
import { getUserToken } from "../utils/global";
const BASE_URL = "https://localhost:7099/api";
export const getAllBookingsByStadiumIDAPI = async (stadiumId) => {
  const response = await axios.get(
    `${BASE_URL}/Bookings/AllBookingsByStadiumID`,
    {
      params: { stadiumId },
    }
  );
  return response.data;
};
export const getAllBookingsByStadiumIDAndDateAPI = async ({
  stadiumId,
  choosedDate,
}) => {
  const response = await axios.get(
    `${BASE_URL}/Bookings/AllBookingsByStadiumIDAndDate`,
    {
      params: {
        StadiumID: stadiumId,
        Date: choosedDate,
      },
    }
  );

  return response.data;
};
export const getAllBookingsByStadiumIDAndDateAndStatusIDAPI = async ({
  stadiumId,
  statusId,
  choosedDate,
}) => {
  const response = await axios.get(
    `${BASE_URL}/Bookings/AllBookingsByStadiumIDAndDateAndStatus`,
    {
      params: {
        StadiumID: stadiumId,
        StatusID: statusId,
        Date: choosedDate,
      },
    }
  );

  return response.data;
};
export const getAllPendingBookingsByStadiumIDAPI = async ({ stadiumId }) => {
  const response = await axios.get(
    `${BASE_URL}/Bookings/AllPendingBookingsByStadiumID`,
    {
      params: {
        StadiumID: stadiumId,
      },
    }
  );

  return response.data;
};
export const getAllBookingsByUserIDAndDateAndStatusIDAPI = async ({
  userID,
  statusId,
  choosedDate,
}) => {
  const response = await axios.get(
    `${BASE_URL}/Bookings/AllBookingsByUserIDAndDateAndStatus`,
    {
      params: {
        UserID: userID,
        StatusID: statusId,
        Date: choosedDate,
      },
    }
  );

  return response.data;
};
export const getOneTimeBookingsListByStadiumIDAndDateAPI = async ({
  stadiumId,
  choosedDate,
  duration,
}) => {
  const response = await axios.get(
    `${BASE_URL}/Bookings/OneTimeBookingsListByStadiumIDAndDate`,
    {
      params: {
        StadiumID: stadiumId,
        Date: choosedDate,
        Duration: duration,
      },
    }
  );

  return response.data;
};
export const getConstantBookingsListByStadiumIDAndWeekDayAPI = async ({
  stadiumId,
  weekDay,
  duration,
}) => {
  const response = await axios.get(
    `${BASE_URL}/Bookings/ConstantBookingsListByStadiumIDAndWeekDay`,
    {
      params: {
        StadiumID: stadiumId,
        WeekDay: weekDay,
        Duration: duration,
      },
    }
  );

  return response.data;
};
export const getConstantBookingsListByStadiumIDAndWeekDayAndWeekNumberAPI =
  async ({ stadiumId, weekDay, weekNumber, duration }) => {
    const response = await axios.get(
      `${BASE_URL}/Bookings/ConstantBookingsListByStadiumIDAndWeekDayAndWeekNumber`,
      {
        params: {
          StadiumID: stadiumId,
          WeekDay: weekDay,
          WeekNumber: weekNumber,
          Duration: duration,
        },
      }
    );

    return response.data;
  };
export const getUserConstantBookingsByStatusIDAPI = async ({ statusID }) => {
  const response = await axios.get(
    `${BASE_URL}/Bookings/UserConstantBookingsByStatusID`,
    {
      params: {
        StatusID: statusID,
      },
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
      },
    }
  );

  return response.data;
};
export const getUserOneTimeBookingsByStatusIDAPI = async ({ statusID }) => {
  console.log("get user one time: ", statusID);
  const response = await axios.get(
    `${BASE_URL}/Bookings/UserOneTimeBookingsByStatusID`,
    {
      params: {
        StatusID: statusID,
      },
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
      },
    }
  );

  return response.data;
};
export const getAllBookingsStatusAPI = async () => {
  const response = await axios.get(
    `${BASE_URL}/Bookings/AllBookingsStatus`,
    {}
  );

  return response.data;
};
export const addNewBookingAPI = async (newBooking) => {
  const response = await axios.post(`${BASE_URL}/Bookings/Add`, newBooking, {
    headers: {
      Authorization: `Bearer ${getUserToken()}`,
    },
  });

  return response.data;
};
export const addNewOneTimeBookingAPI = async (newBooking) => {
  const response = await axios.post(
    `${BASE_URL}/Bookings/AddOneTime`,
    newBooking,
    {
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
      },
    }
  );

  return response.data;
};
export const addConstantTimeBookingAPI = async (newBooking) => {
  const response = await axios.post(
    `${BASE_URL}/Bookings/AddConstant`,
    newBooking,
    {
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
      },
    }
  );

  return response.data;
};
export const updateBookingStatusAPI = async (data) => {
  const response = await axios.put(`${BASE_URL}/Bookings/UpdateStatus`, null, {
    params: {
      BookingID: data.bookingID,
      BookingStatusID: data.statusID,
    },
  });
  return response.data;
};
export const getOneTimeBookingsAPI = async ({
  stadiumId,
  date,
  bookingStatusID,
}) => {
  console.log(
    "this one time api sror ",
    stadiumId,
    " ",
    date,
    " sadfadf ",
    bookingStatusID
  );

  const response = await axios.get(`${BASE_URL}/Bookings/OneTimeBookings`, {
    params: {
      StadiumID: stadiumId,
      Date: date,
      BookingStatusID: bookingStatusID,
    },
  });

  return response.data;
};
export const getConstantBookingsAPI = async ({
  stadiumId,
  weekDay,
  weekNumber,
  bookingStatusID,
}) => {
  console.log(
    "this constant api sror ",
    stadiumId,
    " ",
    weekDay,
    " ",
    weekNumber,
    " ",
    bookingStatusID
  );
  const response = await axios.get(`${BASE_URL}/Bookings/ConstantBookings`, {
    params: {
      StadiumID: stadiumId,
      WeekDay: weekDay,
      WeekNumber: weekNumber,
      BookingStatusID: bookingStatusID,
    },
  });

  return response.data;
};
