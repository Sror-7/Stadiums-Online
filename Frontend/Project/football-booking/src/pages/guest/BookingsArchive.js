import Container from "@mui/material/Container";
import { Snackbar, Alert, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import BookingsList from "../../components/booking/BookingsList";
import { useGuestBookingsByIDAndStatus } from "../../hooks/Guest/useGuestBookingsByIDAndStatus";
import { ArchiveFilteration } from "../../components/Guest/ArchiveFilteration";
export function BookingsArchive() {
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

  useEffect(() => {}, [bookings]);
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
      <ArchiveFilteration onFilter={handleFilter} />

      <Typography mt={4} style={{ fontWeight: "bold" }}>
        BookingsCount: {bookings ? bookings.length : 0}
      </Typography>

      <hr style={{ marginBottom: "25px", marginTop: "15px" }} />

      {/* Booking List */}

      <BookingsList bookings={bookings} loading={loading} />
    </Container>
  );
}
