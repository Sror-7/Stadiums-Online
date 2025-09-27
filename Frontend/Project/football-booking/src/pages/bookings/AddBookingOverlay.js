import { Button } from "@mui/material";
import BookingCard from "../../components/booking/BookingCard";
import { useDispatch } from "react-redux";
import {
  addNewOneTimeBooking,
  addConstantTimeBooking,
} from "../../features/booking/bookingThunk";

export default function AddBookingOverlay({
  booking,
  stadiumID,
  onClose,
  onSubmit,
}) {
  const dispatch = useDispatch();
  async function handleConfirmClick() {
    switch (booking.bookingType) {
      case "OneTime": {
        const result = await dispatch(
          addNewOneTimeBooking({
            StadiumID: booking.stadiumID,
            Date: booking.date,
            StartTime: booking.startTime,
            Duration: booking.duration,
          })
        );

        if (addNewOneTimeBooking.fulfilled.match(result)) {
          onSubmit();
        }
        break;
      }
      case "Constant": {
        const result = await dispatch(
          addConstantTimeBooking({
            StadiumID: booking.stadiumID,
            WeekDay: booking.weekDay,
            // Date: booking.date,
            WeekNumber: booking.weekNumber,
            IsPermanent: booking.isPermanent,
            StartTime: booking.startTime,
            Duration: booking.duration,
          })
        );

        if (addNewOneTimeBooking.fulfilled.match(result)) {
          onSubmit();
        }
        break;
      }
      default:
        break;
    }
  }
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1300,
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: "50px",
            width: "50%",
            position: "relative",
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              border: "none",
              background: "transparent",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ×
          </button>

          <BookingCard booking={booking} mode="create" />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleConfirmClick}
          >
            Submit Booking
          </Button>
        </div>
      </div>
    </>
  );
}
