import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { theme } from "./styles/theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary>
          <AuthProvider>
            <App />
            <Toaster position="top-right" />
          </AuthProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
