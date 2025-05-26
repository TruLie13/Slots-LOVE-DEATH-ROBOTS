import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// 1) Create your theme—set the fontFamily to your new font:
const theme = createTheme({
  typography: {
    fontFamily: '"Russo One", sans-serif',
    // ...override any other variants here if you like...
  },
  // you can also override palette, components, etc, here
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
