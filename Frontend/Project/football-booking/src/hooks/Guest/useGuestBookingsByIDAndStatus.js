import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  getUserOneTimeBookingsByStatusID,
  getUserConstantBookingsByStatusID,
} from "../../features/booking/bookingThunk";

export function useGuestBookingsByIDAndStatus() {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function LoadBookings({ statusID, type }) {
    setLoading(true);
    setError(null);
    try {
      let result;

      if (type === "OneTime") {
        result = await dispatch(getUserOneTimeBookingsByStatusID({ statusID }));
      } else if (type === "Constant") {
        result = await dispatch(
          getUserConstantBookingsByStatusID({ statusID })
        );
      } else {
        throw new Error("Invalid booking type");
      }

      if (result.meta.requestStatus === "fulfilled") {
        setBookings(result.payload);
      } else {
        setError("Failed to load bookings");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { bookings, LoadBookings, loading, error };
}
