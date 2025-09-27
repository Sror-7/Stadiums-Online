import { Box, Container } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import { useStadiums } from "../../hooks/stadiums/useStadiums";
import StadiumsList from "../../components/stadium/StadiumsList";
import { StadiumFilterBar } from "../../components/stadium/StadiumsFilterBar";
import { ShowBookings } from "../../services/stadiums/StadiumCardActions";
import { useStadiumsWithSettings } from "../../hooks/stadiums/useStadiumsWithSettings";
export function Stadiums() {
  // const { stadiums, setSearchName } = useStadiums();
  const { stadiums, setSearchName } = useStadiumsWithSettings();
  console.log("this : ", stadiums);
  return (
    <Box sx={{ mt: 2 }}>
      <Container maxWidth="xl">
        <StadiumFilterBar setSearchName={setSearchName}></StadiumFilterBar>
        <StadiumsList
          stadiums={stadiums}
          CardActions={ShowBookings}
        ></StadiumsList>
      </Container>
    </Box>
  );
}
