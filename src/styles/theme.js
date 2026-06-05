import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#101054" },
    error: { main: "#c0392b" },
    background: { default: "#f4f5f7" },
  },
  shape: { borderRadius: 8 },
});
