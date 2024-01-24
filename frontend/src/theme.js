import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4292e1",
      light: "#ffffff",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
      text: "#000000",
    },
    secondary: {
      main: "#E0C2FF",
      light: "#F5EBFF",
      // dark: will be calculated from palette.secondary.main,
      text: "#7d7d7d",
    },
    draft: "#ffe3be",
    error: {
      main: "#d32f2f",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
    },
  },
});

export default theme;
