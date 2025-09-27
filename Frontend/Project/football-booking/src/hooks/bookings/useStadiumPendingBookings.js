import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPendingBookingsByStadiumID } from "../../features/booking/bookingThunk";
export function useStadiumPendingBookings(StadiumID) {
  const dispatch = useDispatch();
  const [myBookings, setMyBookings] = useState([]);

  async function LoadPendingBookings() {
    const result = await dispatch(
      getPendingBookingsByStadiumID({
        stadiumId: StadiumID,
      })
    );
    console.log("My Pending: ", result.payload);
    setMyBookings(result.payload);
  }
  useEffect(() => {
    LoadPendingBookings();
  }, [dispatch, StadiumID]);

  return {
    myBookings,
  };
}
