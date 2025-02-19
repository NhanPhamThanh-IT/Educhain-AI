// App.jsx
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./routes";

// Import MUI global styles
import { ThemeProvider, CssBaseline } from '@mui/material';

// components
import theme from "./utils/themes";
import NotistackProvider from "./components/NotistackProvider";
import AppBarComponent from "./components/AppBar";

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelmetProvider>
          <BrowserRouter>
            {/* Use appbar for all pages in the system */}
            <AppBarComponent />
            <NotistackProvider>
              <MainRouter />
            </NotistackProvider>
          </BrowserRouter>
        </HelmetProvider>
      </ThemeProvider>
    </>
  );
}
