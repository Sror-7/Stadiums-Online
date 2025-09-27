import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getOneTimeBookingsListByStadiumIDAndDate } from "../../features/booking/bookingThunk";
import { formatDate } from "../../utils/global";
import {
  getConstantBookingsListByStadiumIDAndWeekDay,
  getConstantBookingsListByStadiumIDAndWeekDayAndWeekNumber,
} from "../../features/booking/bookingThunk";

export default function useBookings(stadiumID) {
  const dispatch = useDispatch();
  const [bookingsList, setBookingsList] = useState([]);

  const [filter, setFilter] = useState("Available");

  async function loadOnceBookings(bookingType) {
    const result = await dispatch(
      getOneTimeBookingsListByStadiumIDAndDate({
        stadiumId: stadiumID,
        choosedDate: formatDate(bookingType.date),
        duration: bookingType.duration,
      })
    );
    if (result.payload) setBookingsList(result.payload);
    else setBookingsList([]);
  }
  async function loadWeeklyBookings(bookingType) {
    if (bookingType.selectedWeeks.isPermanent) {
      const result = await dispatch(
        getConstantBookingsListByStadiumIDAndWeekDay({
          stadiumId: stadiumID,
          weekDay: bookingType.weekDay,
          duration: bookingType.duration,
        })
      );
      if (result.payload) setBookingsList(result.payload);
      else setBookingsList([]);
    } else {
      const result = await dispatch(
        getConstantBookingsListByStadiumIDAndWeekDayAndWeekNumber({
          stadiumId: stadiumID,
          weekDay: bookingType.weekDay,
          weekNumber: bookingType.selectedWeeks.weekNumber,
          duration: bookingType.duration,
        })
      );
      if (result.payload) setBookingsList(result.payload);
      else setBookingsList([]);
    }
  }

  const loadBookings = useCallback((bookingType) => {
    if (bookingType == null) {
      setBookingsList([]);
      return;
    }

    switch (bookingType.type) {
      case "once":
        loadOnceBookings(bookingType);
        break;
      case "weekly":
        loadWeeklyBookings(bookingType);
        break;
      default:
        console.warn("Unknown booking type:", bookingType);
    }
  }, []);

  const filteredBookings = useMemo(() => {
    switch (filter) {
      case "Available":
        return bookingsList.filter((b) => b.bookingStatus === "Available");
      case "Booked":
        return bookingsList.filter((b) => b.bookingStatus === "Accepted");
      case "Pending":
        return bookingsList.filter((b) => b.bookingStatus === "Pending");
      default:
        return bookingsList;
    }
  }, [filter, bookingsList]);

  return {
    setFilter,
    bookingsList: filteredBookings,
    loadBookings,
  };
}
