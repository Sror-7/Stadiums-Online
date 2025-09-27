// src/features/bookings/components/BookingsList.jsx
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import StadiumCard from "./StadiumCard";
export default function StadiumsList({ stadiums, CardActions }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const renderActions = (stadium) => {
    return (
      <CardActions
        stadium={{
          id: stadium.stadiumInfo?.id,
          isAvailable: stadium.settingsInfo?.isAvailableForBookings,
        }}
      />
    );
  };
  if (!stadiums.length) return <h1>No Stadiums Found!</h1>;

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
          style={{ paddingBottom: "30px" }}
        >
          {stadiums.map((stadium) => (
            <SwiperSlide key={stadium.id} style={{ width: "100%" }}>
              <StadiumCard stadium={stadium} mode={"show"} />
              {renderActions(stadium)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  } else {
    return (
      <Grid container spacing={2} justifyContent="center">
        {stadiums.map((stadium) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={stadium.id}>
            <StadiumCard stadium={stadium} mode={"show"} />
            {renderActions(stadium)}
          </Grid>
        ))}
      </Grid>
    );
  }
}
