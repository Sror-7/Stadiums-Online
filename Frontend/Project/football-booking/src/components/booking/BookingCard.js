import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Link } from "@mui/material";
import { useState } from "react";
import { formatTime } from "../../utils/global";
import ShowStadiumInfoCard from "../stadium/ShowStadiumInfoCard";
export default function BookingCard({ booking }) {
  const addMinutes = (time, duration) => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    date.setMinutes(date.getMinutes() + duration);

    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  const [showStadium, setShowStadium] = useState(false);

  return (
    <>
      {showStadium && (
        <ShowStadiumInfoCard onClose={() => setShowStadium(false)} />
      )}
      <Card
        sx={{
          width: "100%",
          borderRadius: 3,
          backgroundColor: "white",
          color: "secondary.main",
          border: "1px solid",
          boxShadow: 4,
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <PersonIcon />
            <Typography variant="body1">
              Status: {booking.bookingStatus}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Typography variant="body1">
              Stadium:{" "}
              <Link component="button" onClick={() => setShowStadium(true)}>
                Vedeng SPORT
              </Link>
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <CalendarMonthIcon />

            <Typography variant="body1">
              Day:{" "}
              {booking.weekDay && booking.weekDay.trim() !== ""
                ? booking.weekDay
                : new Date(booking.date).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <AccessTimeIcon />
            <Typography variant="body1">
              Start Time: {formatTime(booking.startTime)}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <AccessTimeIcon />
            <Typography variant="body1">
              End Time: {addMinutes(booking.startTime, booking.duration)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
