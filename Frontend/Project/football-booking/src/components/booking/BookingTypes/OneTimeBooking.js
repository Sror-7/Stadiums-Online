import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
export default function OneTimeBooking({
  date,
  setDate,
  duration,
  setDuration,
}) {
  const durations = [30, 60, 90, 120];
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        width: "100%",
        mb: 3,
        flexDirection: { xs: "column", sm: "row" }, // عمود للشاشات الصغيرة، صف للشاشات الكبيرة
      }}
    >
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        disableOpenPickerKeyboardInput
      >
        <DatePicker
          label="اختر التاريخ"
          value={date ? dayjs(date) : null} // تحويل string لـ Dayjs
          onChange={(newValue) => {
            if (newValue && newValue.isBefore(dayjs(), "day")) {
              setDate(dayjs().format("YYYY-MM-DD"));
            } else if (newValue) {
              setDate(newValue ? newValue.format("YYYY-MM-DD") : "");
            }
          }}
          renderInput={(params) => <TextField fullWidth {...params} />}
          minDate={dayjs()}
          fullWidth
          sx={{ flex: 1 }}
        />
      </LocalizationProvider>
      <TextField
        select
        label="Minutes"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        fullWidth
        sx={{ flex: 1 }}
      >
        {durations.map((d) => (
          <MenuItem key={d} value={d}>
            {d} Minutes
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
