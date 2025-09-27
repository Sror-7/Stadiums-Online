import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Container, Snackbar, Alert } from "@mui/material";
import BookingsList from "../../components/booking/BookingsList";
import { Book } from "../../services/bookings/BookingCardActions";
import useBookings from "../../hooks/bookings/useBookings";
import { BookingTypes } from "../../components/booking/BookingTypes/BookingTypes";
export function Bookings() {
  const [searchParams] = useSearchParams();
  const stadiumID = searchParams.get("id");
  const { bookingsList, loadBookings } = useBookings(stadiumID);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  function handleGenerateSlots(bookingData) {
    loadBookings(bookingData);
  }

  return (
    <Container maxWidth="xl">
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      <BookingTypes onGenerateSlots={handleGenerateSlots}></BookingTypes>
      <hr style={{ marginBottom: "25px", marginTop: "15px" }} />

      <BookingsList bookings={bookingsList} CardAction={Book} />
    </Container>
  );
}
