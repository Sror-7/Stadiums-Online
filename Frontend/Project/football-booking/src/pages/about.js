import React from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import theme from "../theme";
import img1 from "../imgs/stadium-default.jpg";
export default function AboutUs() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* العنوان */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h6" color="text.secondary">
          We connect stadium owners with players to make booking easy and fast.
        </Typography>
      </Box>

      {/* قسم الوصف */}
      <Grid container spacing={4} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <img
            src={img1}
            alt="Stadium"
            style={{ width: "100%", borderRadius: "16px" }}
          />
        </Grid>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
            borderRadius: 2,
            fontWeight: "bold",
            p: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Our Mission
          </Typography>
          <Typography>
            We aim to modernize the way people book stadiums by providing an
            easy-to-use platform that benefits both owners and players. No more
            phone calls, just book online in seconds.
          </Typography>
        </Grid>
      </Grid>

      {/* فريق العمل */}
      <Box mt={10} textAlign="center">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Our Team
        </Typography>
        <Typography variant="body1" paragraph align="center">
          We are inspired by the opportunity to realize ourselves through the
          goals of our company. Each of us is a unique individual. We respect
          and value one another, complementing each other as a team.
        </Typography>

        <Typography variant="body1" paragraph align="center">
          We know how to listen attentively and hear our colleagues. We work in
          an atmosphere of openness, trust, mutual help, and support.
        </Typography>

        <Typography variant="body1" paragraph align="center">
          Shared goals and objectives unite us. We actively discuss ideas with
          the full understanding that it is the only way to discover the truth.
          Even when discussing the most difficult and controversial questions,
          we strive to find common ground and make consensus-based decisions.
        </Typography>

        <Typography variant="body1" paragraph align="center">
          We recognize that all our victories, strategic achievements, as well
          as failures, are collective ones. We share joint responsibility for
          the results of our work and do not shy away from personal
          responsibility.
        </Typography>
      </Box>
    </Container>
  );
}
