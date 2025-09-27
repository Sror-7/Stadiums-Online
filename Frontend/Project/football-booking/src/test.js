import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Rating,
} from "@mui/material";
import Bookings from "./pages/dashboard/stadiumOwnerPages/bookings/Bookings";
const BookingCard = () => {
  const [open, setOpen] = useState(false);

  // بيانات وهمية للحجز والملعب
  const booking = {
    id: 1,
    teamName: "Team A",
    date: "2025-09-11",
    time: "18:00",
    stadiumName: "Green Stadium",
    stadiumImage:
      "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d", // صورة وهمية
    stadiumAddress: "Baghdad, Iraq",
    stadiumPhone: "+964 700 000 000",
    stadiumDescription:
      "ملعب عصري مجهز بأحدث التقنيات. مناسب لمباريات كرة القدم والفعاليات الرياضية الأخرى.",
  };

  return <Bookings></Bookings>;
};

export default BookingCard;
