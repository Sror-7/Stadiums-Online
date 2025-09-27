import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import { getStadiumInfoByID } from "../../features/stadium/stadiumThunk";
import { useDispatch } from "react-redux";
import stadium_default from "../../imgs/stadium-default.jpg";

export default function StadiumCard({ stadium, stadiumID }) {
  const dispatch = useDispatch();

  const [stadiumInfo, setStadiumInfo] = useState({});
  const [bookingSettings, setBookingSettings] = useState({});

  // تحميل بيانات الملعب
  async function loadStadiumData() {
    if (stadium && Object.keys(stadium).length > 0) {
      // إذا الـ prop stadium موجود
      setStadiumInfo(stadium.stadiumInfo || {});
      setBookingSettings(stadium.settingsInfo || {});
    } else if (stadiumID) {
      // إذا لدينا فقط stadiumID نجلب البيانات من الـ API
      const result = await dispatch(
        getStadiumInfoByID({ stadiumId: stadiumID })
      );

      if (getStadiumInfoByID.fulfilled.match(result)) {
        const data = result.payload || {};
        setStadiumInfo(data.stadiumInfo || {});
        setBookingSettings(data.settingsInfo || {});
      }
    }
  }

  useEffect(() => {
    loadStadiumData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stadium, stadiumID]); // إعادة التحميل إذا تغيّر الـ prop

  return (
    <Card
      sx={{
        width: "100%",
        mx: 0,
        my: 2,
        borderRadius: 3,
        boxShadow: 4,
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={stadiumInfo.imageUrl || stadium_default}
        alt={stadiumInfo.name || "Stadium Image"}
        style={{ objectFit: "cover" }}
      />
      <CardContent>
        {/* اسم الملعب */}
        <Typography
          gutterBottom
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
        >
          {stadiumInfo.name || "Stadium Name"}
        </Typography>

        {/* المدينة */}
        <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
          <LocationOnIcon color="action" sx={{ mr: 1 }} />
          <Typography variant="body1">
            {stadiumInfo.city || "Unknown City"}
          </Typography>
        </Box>

        {/* السعر */}
        <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
          <AttachMoneyIcon color="success" sx={{ mr: 1 }} />
          <Typography variant="body1">
            Price/hour:{" "}
            {bookingSettings.pricePerHour !== undefined
              ? bookingSettings.pricePerHour
              : "N/A"}
            $
          </Typography>
        </Box>

        {/* الحالة */}
        <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
          {bookingSettings.isAvailableForBookings ? (
            <>
              <CheckCircleIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="body1">Available</Typography>
            </>
          ) : (
            <>
              <CancelIcon color="error" sx={{ mr: 1 }} />
              <Typography variant="body1">Not available</Typography>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
