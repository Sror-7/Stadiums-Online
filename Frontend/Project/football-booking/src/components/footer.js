import React from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import theme from "../theme";
import { useSelector } from "react-redux";

export default function Footer() {
  const currentUser = useSelector((state) => state.user.currentUserInfo);
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.secondary.main,
        color: "white",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo + About */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              GOOL
            </Typography>
            <Typography variant="body2">
              Your ultimate platform to book stadiums easily and join as a
              stadium owner.
            </Typography>
          </Grid>
          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link
                href="/"
                underline="hover"
                color="inherit"
                sx={{
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                Home
              </Link>
              {currentUser.length === 0 ? (
                <></>
              ) : (
                <Link
                  href="/dashboard"
                  underline="hover"
                  color="inherit"
                  sx={{
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  Dashboard
                </Link>
              )}
              <Link
                href="/stadiums"
                underline="hover"
                color="inherit"
                sx={{
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                Stadiums
              </Link>{" "}
              <Link
                href="/contact"
                underline="hover"
                color="inherit"
                sx={{
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                Contact
              </Link>{" "}
              <Link
                href="/about"
                underline="hover"
                color="inherit"
                sx={{
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                About Us
              </Link>
            </Box>
          </Grid>

          {/* Account */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Account
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {currentUser.length === 0 ? (
                <>
                  {" "}
                  <Link
                    href="/login"
                    underline="hover"
                    color="inherit"
                    sx={{
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    underline="hover"
                    color="inherit"
                    sx={{
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  {" "}
                  <Link
                    href="/dashboard/profile"
                    underline="hover"
                    color="inherit"
                    sx={{
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    Profile
                  </Link>
                  {currentUser.role === "StadiumOwner" ? (
                    <></>
                  ) : (
                    <Link
                      href="/join-owner"
                      underline="hover"
                      color="inherit"
                      sx={{
                        "&:hover": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      Join as Stadium Owner
                    </Link>
                  )}
                </>
              )}
            </Box>
          </Grid>
          {/* Contact */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              About GOOL
            </Typography>
            {/* <Typography variant="body2">Email: support@gool.com</Typography>
            <Typography variant="body2">Phone: +964 770 123 4567</Typography> */}
            <Box display="flex" flexDirection="column" gap={1}>
              <Link
                href="/faqs"
                underline="hover"
                color="inherit"
                sx={{
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                FAQs
              </Link>
              <Link
                href="/terms"
                underline="hover"
                color="inherit"
                sx={{
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                Terms and conditions
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom */}
        <Box
          textAlign="center"
          pt={5}
          mt={5}
          borderTop="1px solid rgba(255,255,255,0.2)"
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} GOOL. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
