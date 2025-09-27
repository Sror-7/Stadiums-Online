import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBookingsByStadiumIDAndDateAndStatusID } from "../../features/booking/bookingThunk";

export function useBookingsList(
  StadiumID,
  statusId = null,
  choosedDate = null
) {
  const dispatch = useDispatch();
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);

      try {
        const resultAction = await dispatch(
          getBookingsByStadiumIDAndDateAndStatusID({
            stadiumId: StadiumID,
            statusId: statusId,
            choosedDate: choosedDate,
          })
        );

        const data = resultAction.payload;
        setMyBookings(data || []);
      } catch (err) {
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    if (StadiumID) {
      fetchBookings();
    }
  }, [dispatch, StadiumID, statusId, choosedDate]);

  return {
    myBookings,
    loading,
    error,
  };
}
