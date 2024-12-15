import { Route, Routes, useLocation } from "react-router-dom";

import "./index.css";
import LoginPage from "./app/auth/login/login";
import Navbar from "./components/navbar";
import Dashboard from "./app/superAdmin/dashboard";
import { routers } from "./routes";
import Statistika from "./app/superAdmin/statistika";

function App() {
  const ROLE = sessionStorage.getItem("role");
  const location = useLocation();

  const filteredRoutes =
    ROLE === "ROLE_SUPER_ADMIN"
      ? routers()?.filter(
          (item: { layout: string }) => item.layout === "/super-admin"
        )
      : [];

  return (
    <>
      {location.pathname !== "/" && <Navbar navigation={filteredRoutes} />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/super-admin/dashboard" element={<Dashboard />} />
        <Route path="/super-admin/statistika" element={<Statistika />} />
        
      </Routes>
    </>
  );
}

export default App;
