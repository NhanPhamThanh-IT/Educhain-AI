// App.jsx
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./routes";
// components
import NotistackProvider from "./components/NotistackProvider";
import AppBarComponent from "./components/AppBar";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <NotistackProvider>
          {/* Use appbar for all pages in the system */}
          <AppBarComponent /> 
          <MainRouter />
        </NotistackProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
