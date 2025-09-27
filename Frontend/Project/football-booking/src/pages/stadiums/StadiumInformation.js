import { Typography, Grid } from "@mui/material";
// import { ShowStadiumInformation } from "../../components/stadium/ShowStadiumInfoCard";

import { useOwnerStadium } from "../../hooks/stadiums/useOwnerStadium";
import { ShowStadiumBookingsSettings } from "../../components/stadium/ShowStadiumBookingsSettingsCard";
// import { ShowStadiumSettingsCard } from "../../components/stadium/ShowStadiumSettingsCard";
import { ShowStadiumSettingsCard } from "../../components/stadium/ShowStadiumSettingsCard";
import {
  updateStadiumInfo,
  updateStadiumBookingSettings,
} from "../../features/stadium/stadiumThunk";
import { useDispatch } from "react-redux";
import { useStadiumSettings } from "../../hooks/stadiums/useStadiumSettings";
export function StadiumInformation() {
  const { stadiumInfo } = useOwnerStadium();

  const { stadiumSettings } = useStadiumSettings();
  console.log("Informations: ", stadiumInfo);
  console.log("Settings: ", stadiumSettings);
  const dispatch = useDispatch();
  function onUpdateStadium(newStadiumInformation) {
    dispatch(
      updateStadiumInfo({
        id: stadiumInfo.id,
        patchData: newStadiumInformation,
      })
    );
  }
  function onUpdateStadiumSettings(newBookingSettings) {
    dispatch(
      updateStadiumBookingSettings({
        id: stadiumInfo.id,
        patchData: newBookingSettings,
      })
    );
  }
  if (!stadiumInfo) {
    return (
      <Grid container justifyContent="center" alignItems="center" padding={3}>
        <Typography variant="h6">جاري تحميل معلومات الملعب...</Typography>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} padding={3}>
      {/* Stadium Information Card */}
      <ShowStadiumSettingsCard
        StadiumInformation={{
          id: stadiumInfo.id,
          name: stadiumInfo.name,
          description: stadiumInfo.description,
          email: stadiumInfo.email,
          phone: stadiumInfo.phone,
          phoneCode: stadiumInfo.phoneCode,
          country: stadiumInfo.country,
          city: stadiumInfo.city,
          imageUrl: stadiumInfo.imageUrl,
          createdDate: stadiumInfo.createdDate,
        }}
        onUpdate={onUpdateStadium}
      />

      {/* Booking Settings Card */}
      {stadiumSettings && (
        <ShowStadiumBookingsSettings
          StadiumBookingsSettings={stadiumSettings}
          onUpdate={onUpdateStadiumSettings}
        />
      )}
    </Grid>
  );
}
