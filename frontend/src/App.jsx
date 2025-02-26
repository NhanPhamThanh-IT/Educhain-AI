// App.jsx
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./routes";

// Import MUI global styles
import { ThemeProvider, CssBaseline } from '@mui/material';

// components
import theme from "./utils/themes";
import NotistackProvider from "./components/NotistackProvider";

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelmetProvider>
          <BrowserRouter>
            <NotistackProvider>
              <MainRouter />
            </NotistackProvider>
          </BrowserRouter>
        </HelmetProvider>
      </ThemeProvider>
    </>
  );
}
