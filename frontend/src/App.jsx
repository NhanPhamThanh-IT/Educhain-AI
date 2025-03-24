// App.jsx
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./routes";

// Import MUI global styles
import { ThemeProvider, CssBaseline } from '@mui/material';

// components
import theme from "./utils/themes";
import NotistackProvider from "./components/NotistackProvider";

// smart_contract
import { TOKEN_ICO_Provider } from "./context/index.jsx";
import Index from "./index.jsx";

export default function App() {
  return (
    <TOKEN_ICO_Provider>
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
    </TOKEN_ICO_Provider>
  );
}
