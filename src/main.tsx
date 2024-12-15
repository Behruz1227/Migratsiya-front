import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Navbar from "./components/navbar/index.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Navbar navigation={[{name: "Home", path: "/home"}]} />
      <App />
      <h1 className="text-green-700 text-3xl">asaaassasasasasa</h1>
    </StrictMode>
  </BrowserRouter>
);
