// src/hooks/bookings/useBookings.js
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getOneTimeBookings,
  getConstantBookings,
} from "../../features/booking/bookingThunk";

export default function useBookings(filters) {
  console.log("use Bookings : ", filters);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      try {
        let data = [];

        if (filters.type === "OneTime") {
          const resultAction = await dispatch(
            getOneTimeBookings({
              stadiumId: filters.stadiumId,
              date: filters.date,
              bookingStatusID: filters.statusId !== 0 ? filters.statusId : null,
            })
          );
          data = resultAction.payload || [];
        }

        if (filters.type === "Constant") {
          const resultAction = await dispatch(
            getConstantBookings({
              stadiumId: filters.stadiumId,
              weekDay: filters.weekDay,
              weekNumber: filters.weekNumber || null,
              bookingStatusID: filters.statusId !== 0 ? filters.statusId : null,
            })
          );
          data = resultAction.payload || [];
        }

        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [filters, dispatch]);

  return { bookings, loading };
}
