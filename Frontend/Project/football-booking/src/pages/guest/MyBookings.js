import Container from "@mui/material/Container";
import { Snackbar, Alert, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import BookingsList from "../../components/booking/BookingsList";
import { MyBookingsFilteration } from "../../components/Guest/MyBookingsFilteration";
import { useGuestBookingsByIDAndStatus } from "../../hooks/Guest/useGuestBookingsByIDAndStatus";
import { Cancell } from "../../services/bookings/BookingCardActions";
import { BOOKING_STATUS_IDS } from "../../constants/BookingStatus";
export function MyBookings() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [filter, setFilter] = useState();

  const { bookings, LoadBookings, loading } = useGuestBookingsByIDAndStatus();

  useEffect(() => {
    if (filter) {
      LoadBookings(filter);
    }
  }, [filter]);

  const handleFilter = (obj) => {
    setFilter(obj);
  };

  return (
    <Container maxWidth="xl">
      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      {/* Filteration */}
      <MyBookingsFilteration onFilter={handleFilter} />
      <Typography mt={4} style={{ fontWeight: "bold" }}>
        BookingsCount: {bookings ? bookings.length : 0}
      </Typography>

      <hr style={{ marginBottom: "25px", marginTop: "15px" }} />

      {/* Booking List */}
      {filter && filter.statusID === BOOKING_STATUS_IDS.PENDING ? (
        <BookingsList
          bookings={bookings}
          loading={loading}
          CardAction={Cancell}
        />
      ) : (
        <BookingsList bookings={bookings} loading={loading} />
      )}
    </Container>
  );
}
