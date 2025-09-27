import React from "react";
import { Box, Typography, Button } from "@mui/material";

// بيانات وهمية لمحاكاة الـ hook
const fakeStadium = {
  ID: 1,
  OwnerID: 10,
  Name: "Green Stadium",
  Country: "Iraq",
  City: "Baghdad",
  Address: "Al-Rusafa St., Baghdad",
  Description: "ملعب مجهز بشكل ممتاز لمباريات كرة القدم والفعاليات الرياضية.",
  Phone: "+964 700 123 4567",
  PhoneCode: "+964",
  Email: "info@greenstadium.com",
  ImageUrl: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d",
  CreatedDate: new Date(),
};

const ShowStadiumInfoCard = ({ onClose }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: 2,
        p: 3,
        zIndex: 1300,
      }}
    >
      {fakeStadium.ImageUrl && (
        <Box
          component="img"
          src={fakeStadium.ImageUrl}
          alt={fakeStadium.Name}
          sx={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderRadius: 2,
            mb: 2,
          }}
        />
      )}

      <Typography variant="h6" sx={{ mb: 1 }}>
        {fakeStadium.Name}
      </Typography>

      <Typography variant="body2" sx={{ mb: 0.5 }}>
        <strong>الدولة:</strong> {fakeStadium.Country}
      </Typography>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        <strong>المدينة:</strong> {fakeStadium.City}
      </Typography>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        <strong>العنوان:</strong> {fakeStadium.Address}
      </Typography>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        <strong>الهاتف:</strong> {fakeStadium.Phone}
      </Typography>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        <strong>البريد الإلكتروني:</strong> {fakeStadium.Email}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        {fakeStadium.Description}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained" onClick={onClose}>
          إغلاق
        </Button>
      </Box>
    </Box>
  );
};

export default ShowStadiumInfoCard;
