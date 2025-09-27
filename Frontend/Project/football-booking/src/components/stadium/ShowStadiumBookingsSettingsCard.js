import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  IconButton,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getObjectDiffPatch } from "../../utils/global";
export function ShowStadiumBookingsSettings({
  StadiumBookingsSettings,
  onUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [bookingSettings, setBookingSettings] = useState({
    id: 0,
    stadiumID: 0,
    isAvailableForBookings: false,
    pricePerHour: 0,
  });
  const [bookingSettingsUpdate, setBookingSettingsUpdate] =
    useState(bookingSettings);

  useEffect(() => {
    setBookingSettings(StadiumBookingsSettings);
    setBookingSettingsUpdate(StadiumBookingsSettings);
  }, [StadiumBookingsSettings]);

  const handleChange = (field, value) => {
    setBookingSettingsUpdate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const patchData = getObjectDiffPatch(
      bookingSettings,
      bookingSettingsUpdate
    );
    if (onUpdate) {
      onUpdate(patchData);
    }

    setBookingSettings(bookingSettingsUpdate);
    setIsEditing(false);
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center" }}
          >
            ⚙️ Booking Settings
            <IconButton
              onClick={() => setIsEditing(!isEditing)}
              sx={{ marginLeft: "auto" }}
            >
              <EditIcon />
            </IconButton>
          </Typography>

          {isEditing ? (
            <>
              <FormControlLabel
                control={
                  <Switch
                    checked={bookingSettingsUpdate.isAvailableForBookings}
                    onChange={(e) =>
                      handleChange("isAvailableForBookings", e.target.checked)
                    }
                  />
                }
                label="Available for bookings?"
                sx={{ mt: 1 }}
              />

              <TextField
                fullWidth
                type="number"
                label="Price per hour ($)"
                name="pricePerHour"
                value={bookingSettingsUpdate.pricePerHour}
                onChange={(e) => handleChange("pricePerHour", e.target.value)}
                margin="normal"
              />

              <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
                Save
              </Button>
            </>
          ) : (
            <>
              <Typography sx={{ mt: 1 }}>
                {bookingSettings.isAvailableForBookings
                  ? "✅ Stadium is available for bookings."
                  : "❌ Stadium is not available for bookings."}
              </Typography>
              <Typography>
                💲 Price per hour: {bookingSettings.pricePerHour}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}
