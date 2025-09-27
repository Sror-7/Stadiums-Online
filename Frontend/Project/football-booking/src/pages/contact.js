import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Link,
  Stack,
} from "@mui/material";
import {
  Instagram,
  Facebook,
  Twitter,
  Email,
  Phone,
} from "@mui/icons-material";
import img from "../imgs/stadium-default.jpg"; // background image

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Contact form data:", formData);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Hero Section with Image and Overlay */}
      <Box
        sx={{
          width: "100%",
          minHeight: { xs: 500, md: 600 },
          position: "relative",
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        {/* Black Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            backdropFilter: "blur(3px)",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.35)",
            zIndex: 1,
          }}
        />

        {/* Texts */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",

            px: 2,
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h6" gutterBottom>
            Reach out to us via email, phone, or our social media channels.
          </Typography>

          {/* Our Information overlay */}
          <Card
            sx={{
              mt: 4,
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#fff",
              backdropFilter: "blur(5px)",
              p: 3,
              borderRadius: 2,
              maxWidth: 400,
              mx: "auto",
            }}
          >
            <Stack spacing={1}>
              <Box display="flex" alignItems="center">
                <Email sx={{ mr: 1 }} />
                <Typography>info@gool.com</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Phone sx={{ mr: 1 }} />
                <Typography>+963 935 154 715</Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <Link href="#" sx={{ mr: 2, color: "#fff" }}>
                  <Instagram />
                </Link>
                <Link href="#" sx={{ mr: 2, color: "#fff" }}>
                  <Facebook />
                </Link>
                <Link href="#" sx={{ mr: 2, color: "#fff" }}>
                  <Twitter />
                </Link>
              </Box>
            </Stack>
          </Card>
        </Box>
      </Box>

      {/* Contact Form below the Image */}
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Send us a Message
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Name"
                    fullWidth
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Email"
                    fullWidth
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Subject"
                    fullWidth
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    error={!!errors.subject}
                    helperText={errors.subject}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Message"
                    fullWidth
                    multiline
                    minRows={4}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    error={!!errors.message}
                    helperText={errors.message}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: "#2e7d32",
                  "&:hover": { backgroundColor: "#27632a" },
                }}
                fullWidth
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
