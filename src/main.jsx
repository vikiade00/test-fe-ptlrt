import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { BarangProvider } from "./context/BarangContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <BarangProvider>
        <App />
      </BarangProvider>
    </BrowserRouter>
  </StrictMode>
);
