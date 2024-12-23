import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import "./index.css";
import LoginPage from "./app/auth/login/login";
import Navbar from "./components/navbar";
import Dashboard from "./app/superAdmin/dashboard";
import { routers } from "./routes";
import Statistika from "./app/superAdmin/statistika";
import Adminlar from "./app/superAdmin/adminlar/adminlar";
import Manager from "./app/superAdmin/manger/adminlar";
import Officer from "./app/officer/officer/officer";
import { useEffect } from "react";
import KichikOfficer from "./app/kichikOfficer/officer";
import UchaskavoyKichik from "./app/kichikOfficer/kichikUchaskavoy/adminlar";

function App() {
  const ROLE = sessionStorage.getItem("role");
  const location = useLocation();
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [location]);

  const filteredRoutes =
    ROLE === "ROLE_SUPER_ADMIN"
      ? routers()?.filter(
          (item: { layout: string }) => item.layout === "/super-admin"
        )
      : ROLE === "ROLE_USER"
      ? routers()?.filter(
          (item: { layout: string }) => item.layout === "/manager"
        )
      : ROLE === "ROLE_ADMIN"
      ? routers()?.filter(
          (item: { layout: string }) => item.layout === "/admin"
        )
      : ROLE === "ROLE_KICHIK_UCHASKAVOY"
      ? routers()?.filter(
          (item: { layout: string }) => item.layout === "/uchaskavoy"
        )
       :[];

  return (
    <>
      {location.pathname !== "/" && <Navbar navigation={filteredRoutes} />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/super-admin/dashboard" element={<Dashboard />} />
        <Route path="/super-admin/statistika" element={<Statistika />} />
        <Route path="/super-admin/offices" element={<Manager />} />
        <Route path="/super-admin/admin" element={<Adminlar />} />
        <Route path="/manager/main" element={<Officer />} />
        <Route path="/uchaskavoy/main" element={<KichikOfficer/>} />
        <Route path="/manager/offices" element={<UchaskavoyKichik/>} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/offices" element={<Officer />} />
        <Route path="/admin/statistika" element={<Statistika />} />
      </Routes>
    </>
  );
}

export default App;
