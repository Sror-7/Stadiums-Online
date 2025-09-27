import React, { useState } from "react";
import { Tabs, Tab, Box, Button } from "@mui/material";
import OneTimeBooking from "./OneTimeBooking";
import WeeklyBooking from "./WeeklyBooking";
import dayjs from "dayjs";
export function BookingTypes({ onGenerateSlots }) {
  const [tab, setTab] = useState(0);
  // const [date, setDate] = useState(dayjs());
  const [bookingData, setBookingData] = useState({
    type: "once",
    date: dayjs().format("YYYY-MM-DD"),
    weekDay: "Sunday",
    duration: 60,
    selectedWeeks: { isPermanent: false, weekNumber: 1 },
  });

  const handleChangeTab = (_, newTab) => {
    setTab(newTab);
    const types = ["once", "weekly"];
    setBookingData((prev) => ({ ...prev, type: types[newTab] }));
    onGenerateSlots(null);
  };

  const handleGenerate = () => {
    onGenerateSlots(bookingData);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3, mb: 4 }}>
        <Tabs value={tab} onChange={handleChangeTab} centered>
          <Tab label="One Time" />
          <Tab label="Constant" />
        </Tabs>
      </Box>

      {tab === 0 && (
        <OneTimeBooking
          date={bookingData.date}
          setDate={(val) => setBookingData((prev) => ({ ...prev, date: val }))}
          duration={bookingData.duration}
          setDuration={(val) =>
            setBookingData((prev) => ({ ...prev, duration: val }))
          }
        />
      )}
      {tab === 1 && (
        <WeeklyBooking
          weekDay={bookingData.weekDay}
          setWeekDay={(val) =>
            setBookingData((prev) => ({ ...prev, weekDay: val }))
          }
          duration={bookingData.duration}
          setDuration={(val) =>
            setBookingData((prev) => ({ ...prev, duration: val }))
          }
          selectedWeeks={bookingData.selectedWeeks}
          setSelectedWeeks={(val) =>
            setBookingData((prev) => ({ ...prev, selectedWeeks: val }))
          }
        />
      )}

      <Button
        variant="contained"
        onClick={handleGenerate}
        sx={{
          mt: 1,
          width: { xs: "100%", sm: "auto" }, // 100% على الموبايل، الحجم الطبيعي على الشاشات الأكبر
        }}
      >
        Show Bookings Cards
      </Button>
    </>
  );
}
