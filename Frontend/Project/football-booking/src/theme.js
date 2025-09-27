// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2f6937", // اللون الرئيسي (الأحمر الغامق)
    },
    secondary: {
      main: "#2c3e50", // لون ثانوي (مثلاً أزرق)
    },
    success: {
      main: "#B80000",
    },
  },
  typography: {
    fontFamily: "IBM Plex Sans, Arial, sans-serif",
  },
});

export default theme;
