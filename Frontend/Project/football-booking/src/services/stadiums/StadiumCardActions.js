import { Box, Button } from "@mui/material";
import { useNavigate, createSearchParams } from "react-router-dom";
export function ShowBookings({ stadium }) {
  const navigate = useNavigate();
  function handleShowBookingsClick(stadiumID) {
    navigate({
      pathname: "bookings",
      search: createSearchParams({ id: stadiumID }).toString(),
    });
  }
  return (
    <Box>
      <Button
        size="small"
        variant="contained"
        disabled={!stadium.isAvailable}
        onClick={() => handleShowBookingsClick(stadium.id)}
      >
        Show Bookings
      </Button>
    </Box>
  );
}
