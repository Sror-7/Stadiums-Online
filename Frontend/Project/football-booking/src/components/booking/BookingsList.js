// src/features/bookings/components/BookingsList.jsx
import {
  Grid,
  useMediaQuery,
  Box,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

import BookingCard from "./BookingCard";
export default function BookingsList({ bookings, CardAction, loading }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isMobile) {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: "200px",
          minWidth: "100%",
          margin: "0 auto",
          marginTop: "30px",
        }}
      >
        <Swiper
          modules={[Scrollbar]}
          scrollbar={{ clickable: true }}
          spaceBetween={15}
          slidesPerView={1.01}
          style={{ height: "310px" }}
        >
          {bookings.map((b) => (
            <SwiperSlide key={b.id}>
              <BookingCard booking={b} />
              {CardAction && <CardAction booking={b} />}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  return (
    <Grid container spacing={2}>
      {bookings.map((b) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={b.id}>
          <BookingCard booking={b} />
          {CardAction && <CardAction booking={b} />}
        </Grid>
      ))}
    </Grid>
  );
}
