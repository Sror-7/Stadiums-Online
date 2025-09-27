// src/components/booking/BookingFilters.jsx
import React from "react";
import {
  Box,
  Tabs,
  Tab,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  MenuItem,
} from "@mui/material";
import { BOOKING_STATUS_IDS } from "../../constants/BookingStatus";

// استيراد الـ DatePicker من MUI
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function BookingFilters({ filters, onChange }) {
  const handleTypeChange = (_, value) => {
    if (value) onChange({ ...filters, type: value });
  };

  const handleStatusChange = (_, value) => {
    if (value) onChange({ ...filters, statusId: value });
  };

  // اليوم الحالي بصيغة dayjs
  const today = dayjs();

  return (
    <Box sx={{ mb: 3 }}>
      {/* Tabs نوع الحجز */}
      <Tabs
        value={filters.type}
        onChange={handleTypeChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        <Tab value="OneTime" label="One-Time Bookings" />
        <Tab value="Constant" label="Constant Bookings" />
      </Tabs>

      {/* حالات الحجز */}
      <ToggleButtonGroup
        sx={{
          mt: 2,
          flexWrap: "wrap", // يسمح بالانتقال للسطر التالي على الموبايل
          gap: 1, // مسافة بين الأزرار
        }}
        color="primary"
        value={filters.statusId}
        exclusive
        onChange={handleStatusChange}
      >
        <ToggleButton value={BOOKING_STATUS_IDS.PENDING}>Pending</ToggleButton>
        <ToggleButton value={BOOKING_STATUS_IDS.ACCEPTED}>
          Accepted
        </ToggleButton>
        <ToggleButton value={BOOKING_STATUS_IDS.REJECTED}>
          Rejected
        </ToggleButton>
        <ToggleButton value={BOOKING_STATUS_IDS.COMPLETED}>
          Completed
        </ToggleButton>
        <ToggleButton value={BOOKING_STATUS_IDS.CANCELLED}>
          Cancelled
        </ToggleButton>
        <ToggleButton value={BOOKING_STATUS_IDS.EXPIRED}>Expired</ToggleButton>
      </ToggleButtonGroup>

      {/* فلترة إضافية حسب النوع */}
      {filters.type === "OneTime" && (
        <Box sx={{ mt: 2, width: { xs: "100%", sm: "auto" } }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={filters.date ? dayjs(filters.date) : today}
              onChange={(newValue) =>
                onChange({
                  ...filters,
                  date: newValue ? newValue.format("YYYY-MM-DD") : null,
                })
              }
              slotProps={{
                textField: { fullWidth: true },
              }}
            />
          </LocalizationProvider>
        </Box>
      )}

      {filters.type === "Constant" && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // عمودي على الموبايل
            gap: 2,
            width: "100%",
          }}
        >
          <TextField
            select
            label="Week Day"
            value={filters.weekDay || ""}
            onChange={(e) => onChange({ ...filters, weekDay: e.target.value })}
            fullWidth
          >
            <MenuItem value="Sunday">Sunday</MenuItem>
            <MenuItem value="Monday">Monday</MenuItem>
            <MenuItem value="Tuesday">Tuesday</MenuItem>
            <MenuItem value="Wednesday">Wednesday</MenuItem>
            <MenuItem value="Thursday">Thursday</MenuItem>
            <MenuItem value="Friday">Friday</MenuItem>
            <MenuItem value="Saturday">Saturday</MenuItem>
          </TextField>

          <TextField
            select
            label="Week Number"
            value={filters.weekNumber}
            onChange={(e) =>
              onChange({ ...filters, weekNumber: Number(e.target.value) })
            }
            fullWidth
          >
            <MenuItem key={0} value={0}>
              All
            </MenuItem>
            {[1, 2, 3, 4].map((num) => (
              <MenuItem key={num} value={num}>
                Week {num}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}
    </Box>
  );
}
