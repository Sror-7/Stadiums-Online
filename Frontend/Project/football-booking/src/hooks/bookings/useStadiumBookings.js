import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  getBookingsByStadiumIDAndDateAndStatusID,
  getAllBookingsStatus,
} from "../../features/booking/bookingThunk";

export function useStadiumBookings(StadiumID) {
  const dispatch = useDispatch();
  const myBookings = useSelector((state) => state.bookings.bookingsList);

  const [datePickerValue, setDatePickerValue] = useState(dayjs());
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [bookingsStatus, setBookingsStatus] = useState([]);
  const [status, setStatus] = useState();
  const [value, setValue] = useState();
  const [isFoundBookings, setIsFoundBookings] = useState(
    "No Bookings Found In Choosed Stadium!"
  );

  useEffect(() => {
    setFilteredBookings(myBookings);
  }, [myBookings]);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const resultAction = await dispatch(getAllBookingsStatus());
        const data = resultAction.payload;
        setBookingsStatus(data);
        setValue(1);
        setStatus(1);
      } catch (error) {
        console.error("Error fetching booking statuses:", error);
      }
    };
    fetchStatuses();
  }, [dispatch]);

  useEffect(() => {
    if (status) {
      dispatch(
        getBookingsByStadiumIDAndDateAndStatusID({
          stadiumId: StadiumID,
          statusId: status,
          choosedDate: null,
        })
      );
    }
  }, [status, dispatch, StadiumID]);

  const handleDatePickerValue = (newValue) => {
    setDatePickerValue(newValue);
  };

  const handleFilterByDate = () => {
    const formattedPickerDate = dayjs(datePickerValue).format("YYYY-MM-DD");
    const d = myBookings.filter((booking) => {
      const bookingDate = dayjs(booking.date).format("YYYY-MM-DD");
      return bookingDate === formattedPickerDate;
    });
    setFilteredBookings(d);
  };

  const handleResetFilter = () => {
    setFilteredBookings(myBookings);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setStatus(newValue);
  };

  return {
    myBookings,
    filteredBookings,
    bookingsStatus,
    datePickerValue,
    value,
    isFoundBookings,
    handleDatePickerValue,
    handleFilterByDate,
    handleResetFilter,
    handleChange,
  };
}
