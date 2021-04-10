import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    background: {
      // paper: "#33a095",
      default: "#f5f5f5",
    },
    primary: {
      light: "#524991",
      main: "#232163",
      dark: "#000038",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7476",
      main: "#f73c4a",
      dark: "#bd0022",
      contrastText: "#fff",
    },
  },

  typography: {
    fontFamily: ["Montserrat", "regular"].join(","),
  },
});

export default theme;
