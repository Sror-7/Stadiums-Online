import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllBookingsStatus } from "../../features/booking/bookingThunk";
export function useBookingsStatuses() {
  const dispatch = useDispatch();
  const [bookingsStatus, setBookingsStatus] = useState([]);
  const [loadingStatuses, setLoadingStatuses] = useState(true);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const resultAction = await dispatch(getAllBookingsStatus());
        const data = resultAction.payload;
        setBookingsStatus(data);
      } catch (error) {
        console.error("Error fetching booking statuses:", error);
      } finally {
        setLoadingStatuses(false);
      }
    };

    fetchStatuses();
  }, [dispatch]);

  return { bookingsStatus, loadingStatuses };
}
