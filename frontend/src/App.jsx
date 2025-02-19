// App.jsx
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./routes";

// Import MUI global styles
import { GlobalStyles } from "@mui/system";

// components
import NotistackProvider from "./components/NotistackProvider";
import AppBarComponent from "./components/AppBar";

export default function App() {
  return (
    <>
      <GlobalStyles styles={{ body: { marginLeft: "0px !important", marginRight: "0px !important" } }} />
      <HelmetProvider>
        <BrowserRouter>
          <NotistackProvider>
            {/* Use appbar for all pages in the system */}
            <AppBarComponent />
            <MainRouter />
          </NotistackProvider>
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
}
