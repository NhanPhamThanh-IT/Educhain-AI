// App.jsx
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./routes";
// components
import NotistackProvider from "./components/NotistackProvider";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <NotistackProvider>
          <MainRouter />
        </NotistackProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
