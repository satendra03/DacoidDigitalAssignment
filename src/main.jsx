import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { EventProvider } from "./context/EventContext";
import { Toaster } from "react-hot-toast";
import { DateProvider } from "./context/DateContext";
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DateProvider>
      <EventProvider>
        <App />
      </EventProvider>
    </DateProvider>
    <Toaster />
    <Analytics />
  </StrictMode>
);
