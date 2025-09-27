import { useState } from "react";
import { Grid, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { BookingTypes } from "../../pages/bookings/BookingTypes";
import dayjs from "dayjs";
export default function BookingsFilterBar({ date, setDate }) {
  const [selectedDuration, setSelectedDuration] = useState(30);

  const durations = [
    { label: "30 Minutes", value: 30 },
    { label: "1 Hour", value: 60 },
    { label: "1.5 Hours", value: 90 },
    { label: "2 Hours", value: 120 },
  ];

  return (
    <Grid container spacing={2} paddingY={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={date ? dayjs(date) : null}
            onChange={(newValue) => setDate(newValue)}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormControl fullWidth>
          <InputLabel>Duration</InputLabel>
          <Select
            value={selectedDuration}
            label="Duration"
            onChange={(e) => setSelectedDuration(e.target.value)}
          >
            {durations.map((d) => (
              <MenuItem key={d.value} value={d.value}>
                {d.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
