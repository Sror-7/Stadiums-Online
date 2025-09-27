import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { BOOKING_STATUS_IDS } from "../../constants/BookingStatus";
import RefreshIcon from "@mui/icons-material/Refresh";
export function ArchiveFilteration({ onFilter }) {
  // state داخلي للاحتفاظ بالاختيارات
  const [statusID, setStatusID] = useState(BOOKING_STATUS_IDS.COMPLETED);
  const [type, setType] = useState("OneTime");

  const handleStatusChange = (_, newStatusID) => {
    if (newStatusID !== null) {
      setStatusID(newStatusID);
      onFilter({ statusID: newStatusID, type }); // نرسل القيمتين معًا
    }
  };

  const handleTypeChange = (_, newType) => {
    if (newType !== null) {
      setType(newType);
      onFilter({ statusID, type: newType });
    }
  };
  // useEffect(() => {
  //   onFilter({ statusID, type });
  // }, []);
  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "column" }} // عمودي على كل الشاشات
        spacing={2}
        sx={{ mb: 3, width: { xs: "100%", sm: "auto" } }}
      >
        <Typography variant="subtitle1">Filter by Status:</Typography>
        <ToggleButtonGroup
          color="primary"
          value={statusID}
          exclusive
          onChange={handleStatusChange}
          aria-label="booking status"
        >
          <ToggleButton value={BOOKING_STATUS_IDS.COMPLETED}>
            COMPLETED
          </ToggleButton>
          <ToggleButton value={BOOKING_STATUS_IDS.CANCELLED}>
            CANCELLED
          </ToggleButton>
          <ToggleButton value={BOOKING_STATUS_IDS.EXPIRED}>
            EXPIRED
          </ToggleButton>
          <ToggleButton value={BOOKING_STATUS_IDS.REJECTED}>
            REJECTED
          </ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="subtitle1">Filter by Type:</Typography>
        <ToggleButtonGroup
          color="secondary"
          value={type}
          exclusive
          onChange={handleTypeChange}
          aria-label="booking type"
        >
          <ToggleButton value="OneTime">OneTime</ToggleButton>
          <ToggleButton value="Constant">Constant</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Button
        variant="outlined"
        startIcon={<RefreshIcon />}
        onClick={() => onFilter({ statusID, type })}
        sx={{ mt: 1, width: { xs: "100%", sm: "auto" } }} // full width على الموبايل
      >
        Refresh
      </Button>
    </>
  );
}
