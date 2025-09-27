import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";

export default function WeeklyBooking({
  weekDay,
  setWeekDay,
  duration,
  setDuration,
  selectedWeeks,
  setSelectedWeeks,
}) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const durations = [30, 60, 90, 120];
  const weeks = ["First Week", "Second Week", "Third Week", "Fourth Week"];
  const ALL = "All Weeks";

  const handleChange = (event) => {
    const value = event.target.value;

    if (value === ALL) {
      setSelectedWeeks({ isPermanent: true, weekNumber: null });
    } else {
      const weekIndex = weeks.indexOf(value);
      setSelectedWeeks({ isPermanent: false, weekNumber: weekIndex + 1 });
    }
  };

  return (
    <Box
      sx={{ display: "flex", gap: 2, width: "100%", mb: 3, flexWrap: "wrap" }}
    >
      {/* اختيار اليوم */}
      <TextField
        select
        fullWidth
        label="Choose a day from week"
        value={weekDay}
        onChange={(e) => setWeekDay(e.target.value)}
        sx={{ flex: 1, minWidth: 150 }}
      >
        {daysOfWeek.map((day) => (
          <MenuItem key={day} value={day}>
            {day}
          </MenuItem>
        ))}
      </TextField>

      {/* اختيار المدة */}
      <TextField
        select
        label="Minutes"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        fullWidth
        sx={{ flex: 1, minWidth: 150 }}
      >
        {durations.map((d) => (
          <MenuItem key={d} value={d}>
            {d} Minutes
          </MenuItem>
        ))}
      </TextField>

      {/* اختيار الأسبوع */}
      <TextField
        select
        label="Choose Week"
        value={
          selectedWeeks.isPermanent
            ? ALL
            : selectedWeeks.weekNumber
            ? weeks[selectedWeeks.weekNumber - 1]
            : ""
        }
        onChange={handleChange}
        fullWidth
      >
        <MenuItem key={ALL} value={ALL}>
          {ALL}
        </MenuItem>
        {weeks.map((week) => (
          <MenuItem key={week} value={week}>
            {week}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
