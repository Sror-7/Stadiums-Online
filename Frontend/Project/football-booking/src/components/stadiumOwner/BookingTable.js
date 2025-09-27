import React from "react";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import {
  Button,
  Stack,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
// import { updateBookingStatusByID } from "../../services/bookings/BookingCardActions";
import { updateBookingStatusByID } from "../../features/booking/bookingThunk";
import { BOOKING_STATUS_IDS } from "../../constants/BookingStatus";

export default function BookingTable({ bookings, loading }) {
  const dispatch = useDispatch();

  // state للـ dialog
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogInfo, setDialogInfo] = React.useState({
    bookingID: null,
    statusID: null,
    message: "",
  });

  // عند الضغط على Accept أو Reject
  const handleOpenDialog = (bookingID, statusID) => {
    const message =
      statusID === 4
        ? "Are you sure you want to approve this booking?"
        : "Are you sure you want to reject this booking?";

    setDialogInfo({ bookingID, statusID, message });
    setOpenDialog(true);
  };

  const handleConfirm = async () => {
    const { bookingID, statusID } = dialogInfo;

    console.log("dd ", dialogInfo);
    try {
      const resultAction = await dispatch(
        updateBookingStatusByID({
          bookingID: bookingID,
          statusID: statusID,
        })
      );
      console.log("Result:", resultAction);
    } catch (err) {
      console.error(err);
    } finally {
      setOpenDialog(false);
    }
  };

  const rows = bookings.map((b, index) => ({
    id: index + 1,
    bookingId: b.id,
    UserID: b.createdByUserID,
    date: b.date ? new Date(b.date).toLocaleDateString() : "-",
    startTime: b.startTime,
    duration: b.duration,
    status: b.bookingStatus,
    weekDay: b.weekDay || "-",
    weekNumber: b.weekNumber ?? "-",
  }));

  const columns = [
    { field: "bookingId", headerName: "ID", width: 90 },
    { field: "UserID", headerName: "UserID", width: 150 },
    { field: "date", headerName: "Date", width: 130 },
    { field: "startTime", headerName: "Start Time", width: 130 },
    { field: "duration", headerName: "Duration", width: 100 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "weekDay", headerName: "Week Day", width: 130 },
    { field: "weekNumber", headerName: "Week Number", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return params.row.status === "Pending" ? (
          <Stack direction="row" spacing={1} pt={1}>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() =>
                handleOpenDialog(
                  params.row.bookingId,
                  BOOKING_STATUS_IDS.ACCEPTED
                )
              }
            >
              Accept
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() =>
                handleOpenDialog(
                  params.row.bookingId,
                  BOOKING_STATUS_IDS.REJECTED
                )
              }
            >
              Reject
            </Button>
          </Stack>
        ) : null;
      },
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto", // scroll أفقي إذا لازم
      }}
    >
      <Box sx={{ minWidth: 700 }}>
        {" "}
        {/* يحدد الحد الأدنى للعرض */}
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          loading={loading}
          autoHeight
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            },
            "& .MuiDataGrid-cell": {
              fontSize: { xs: "0.7rem", sm: "0.875rem" },
            },
          }}
          components={{
            LoadingOverlay: () => (
              <GridOverlay>
                <div style={{ position: "absolute", top: 0, width: "100%" }}>
                  <CircularProgress />
                </div>
              </GridOverlay>
            ),
          }}
        />
      </Box>

      {/* Dialog التأكيد */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>{dialogInfo.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
