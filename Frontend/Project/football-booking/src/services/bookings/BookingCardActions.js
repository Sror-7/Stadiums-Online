import { Box, Button } from "@mui/material";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import AddBookingOverlay from "../../pages/bookings/AddBookingOverlay";
import { updateBookingStatusByID } from "../../features/booking/bookingThunk";
import { BOOKING_STATUS_IDS } from "../../constants/BookingStatus";
import { useDispatch } from "react-redux";
import { ConfirmDialog } from "../../components/myComponents/ConfirmDialog";
export function Book({ booking }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  function handleBookClick() {
    setShowOverlay(true);
  }
  const handleCreatedBooking = () => {
    setSnackbar({
      open: true,
      message: "Booking created successfully!",
      severity: "success",
    });
    setShowOverlay(false);
  };

  return (
    <Box style={{ paddingTop: "10px" }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
      {showOverlay && (
        <AddBookingOverlay
          booking={booking}
          stadiumID={booking.stadiumID}
          onClose={() => setShowOverlay(false)}
          onSubmit={handleCreatedBooking}
        />
      )}
      <Button variant="outlined" onClick={handleBookClick}>
        Book
      </Button>
    </Box>
  );
}
export function Cancell({ booking }) {
  const dispatch = useDispatch();

  console.log("rwq: ", booking);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleOpenSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };
  const handleCloseSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

  // ---------------- Dialog ----------------
  const [dialogOpen, setDialogOpen] = useState(false);
  const [onConfirmAction, setOnConfirmAction] = useState(() => () => {});

  const showConfirmDialog = (onConfirmFunc) => {
    setOnConfirmAction(() => onConfirmFunc);
    setDialogOpen(true);
  };
  const handleDialogClose = () => setDialogOpen(false);

  const handleCancellClick = () => {
    showConfirmDialog(async () => {
      const result = await dispatch(
        updateBookingStatusByID({
          bookingID: booking.id,
          statusID: BOOKING_STATUS_IDS.CANCELLED,
        })
      );

      if (updateBookingStatusByID.fulfilled.match(result)) {
        handleOpenSnackbar("Booking cancelled successfully!", "success");
      } else {
        handleOpenSnackbar("Booking cancellation failed!", "error");
      }

      handleDialogClose();
    });
  };

  return (
    <Box style={{ paddingTop: "10px" }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      <ConfirmDialog
        open={dialogOpen}
        message="Are you sure you want to cancel this booking?"
        onConfirm={onConfirmAction}
        onCancel={handleDialogClose}
      />

      <Button variant="outlined" onClick={handleCancellClick}>
        Cancell
      </Button>
    </Box>
  );
}
export function AcceptReject({ booking }) {
  const dispatch = useDispatch();
  async function updateBookingStatus(bookingID, statusID) {
    const resultAction = await dispatch(
      updateBookingStatusByID({
        bookingID: bookingID,
        statusID: statusID,
      })
    );

    if (updateBookingStatusByID.fulfilled.match(resultAction)) return true;
    else return false;
  }

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [onConfirmAction, setOnConfirmAction] = useState(() => () => {});

  const showConfirmDialog = (message, onConfirmFunc) => {
    setDialogMessage(message);
    setOnConfirmAction(() => onConfirmFunc);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogMessage("");
    setOnConfirmAction(() => () => {});
  };
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  function handleOpenSanckbar(message, severity) {
    setSnackbar({
      open: true,
      message: message,
      severity: severity,
    });
  }
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };
  const handleAccept = (bookingID) => {
    showConfirmDialog("Are you sure you want to accept this booking?", () => {
      let response = updateBookingStatus(
        bookingID,
        BOOKING_STATUS_IDS.ACCEPTED
      );
      if (response) {
        handleOpenSanckbar("Booking accepted successfully!", "success");
      } else {
        handleOpenSanckbar("Booking accepted faild!", "error");
      }
    });
  };
  const handleReject = (bookingID) => {
    showConfirmDialog("Are you sure you want to reject this booking?", () => {
      let response = updateBookingStatus(
        bookingID,
        BOOKING_STATUS_IDS.REJECTED
      );
      if (response) {
        handleOpenSanckbar("Booking rejected successfully!", "success");
      } else {
        handleOpenSanckbar("Booking rejected faild!", "error");
      }
    });
  };
  return (
    <Box paddingTop={1}>
      <ConfirmDialog
        open={dialogOpen}
        message={dialogMessage}
        onConfirm={() => {
          onConfirmAction();
          handleDialogClose();
        }}
        onCancel={handleDialogClose}
      />{" "}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: "primary.main",
            color: "white",
            "& .MuiAlert-icon": {
              color: "white",
            },
          }}
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Button
        variant="outlined"
        onClick={() => handleAccept(booking.bookingID)}
        sx={{
          color: "green",
          borderColor: "green",
          "&:hover": {
            backgroundColor: "green",
            color: "white",
          },

          marginRight: "8px",
          fontWeight: "bold",
        }}
      >
        Accept
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleReject(booking.bookingID)}
        sx={{
          color: "red",
          borderColor: "red",
          "&:hover": {
            backgroundColor: "red",
            color: "white",
          },
          fontWeight: "bold",
        }}
      >
        Reject
      </Button>
    </Box>
  );
}
