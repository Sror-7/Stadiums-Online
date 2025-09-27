import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";

export default function MonthlyBooking({
  monthDay,
  setMonthDay,
  duration,
  setDuration,
}) {
  const durations = [30, 60, 90, 120];

  return (
    <Box sx={{ display: "flex", gap: 2, width: "100%", mb: 3 }}>
      <TextField
        type="number"
        label="اليوم من الشهر"
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: 1, max: 31 }}
        value={monthDay}
        onChange={(e) => setMonthDay(Number(e.target.value))}
        fullWidth
        sx={{ flex: 1 }}
      />
      <TextField
        select
        label="المدة (دقائق)"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        fullWidth
        sx={{ flex: 1 }}
      >
        {durations.map((d) => (
          <MenuItem key={d} value={d}>
            {d} دقيقة
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
