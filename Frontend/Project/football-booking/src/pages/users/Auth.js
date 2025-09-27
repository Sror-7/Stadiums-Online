import { Box, Grid, Typography } from "@mui/material";
import AuthForm from "../../components/Auth/AuthForm";
import theme from "../../theme";
export default function Auth() {
  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Grid
        size={{ xs: false, md: 6 }}
        sx={{
          backgroundImage: "url(/stadium.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" sx={{ color: "white", fontWeight: "bold" }}>
            You are here to enjoy!
          </Typography>
        </Box>
      </Grid>

      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <AuthForm></AuthForm>
      </Grid>
    </Grid>
  );
}
