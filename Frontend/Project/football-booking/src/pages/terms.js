import React from "react";
import { Container, Typography, Box } from "@mui/material";

export default function TermsAndConditions() {
  const termsData = [
    {
      title: "1. Acceptance of Terms",
      description:
        "Users must not misuse the website by introducing harmful material or attempting unauthorized access.",
    },
    {
      title: "2. User Accounts",
      description:
        "To book stadium slots or list your stadium, you must create an account and provide accurate information. You are responsible for maintaining the confidentiality of your login credentials.",
    },
    {
      title: "3. Booking Policy",
      description:
        "All bookings made through the platform are subject to availability and the terms set by stadium owners. Cancellations or refunds may varydepending on the stadium's policy",
    },
    {
      title: "4. Stadium Owner Responsibilities",
      description:
        "Stadium owners must ensure the accuracy of their listings and honor all confirmed bookings. Any disputes between owners and players should be resolved directly.",
    },
    {
      title: "5. Limitation of Liability",
      description:
        "GOOL is a platform that connects stadium owners and players. We are not responsible for issues that arise between users outside the platform, including disputes, damages, or losses.",
    },
    {
      title: "6. Changes to Terms",
      description:
        "We may update these Terms and Conditions from time to time. Users will be notified of significant changes, and continued use of the platform means acceptance of the updated terms.",
    },
    {
      title: "7. Contact Us",
      description:
        "If you have any questions about these Terms and Conditions, please contact us at support@gool.com.",
    },
  ];

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
        Terms and Conditions
      </Typography>
      {termsData.map((term, index) => (
        <Box sx={{ my: 3 }}>
          <Typography variant="h6" gutterBottom>
            {term.title}
          </Typography>
          <Typography>{term.description}</Typography>
        </Box>
      ))}
    </Container>
  );
}
