import { Route, Routes, useLocation } from "react-router-dom";

import "./index.css";
import LoginPage from "./app/auth/login/login";
import Navbar from "./components/navbar";
import Dashboard from "./app/superAdmin/dashboard";
import { routers } from "./routes";
import Statistika from "./app/superAdmin/statistika";
import Adminlar from "./app/superAdmin/adminlar/adminlar";
import Manager from "./app/superAdmin/manger/adminlar";
import Officer from "./app/officer/officer/officer";

function App() {
  const ROLE = sessionStorage.getItem("role");
  const location = useLocation();

  const filteredRoutes =
    ROLE === "ROLE_SUPER_ADMIN"
      ? routers()?.filter(
        (item: { layout: string }) => item.layout === "/super-admin"
      )
      : ROLE === "ROLE_OFFICER" ? routers()?.filter(
        (item: { layout: string }) => item.layout === "/officer"
      ) : [] ;

  return (
    <>
      {location.pathname !== "/" && <Navbar navigation={filteredRoutes} />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/super-admin/dashboard" element={<Dashboard />} />
        <Route path="/super-admin/statistika" element={<Statistika />} />
        <Route path="/super-admin/offices" element={<Manager />} />
        <Route path="/super-admin/admin" element={<Adminlar />} />
        <Route path="/officer/main" element={<Officer/>} />

      </Routes>
    </>
  );
}

export default App;
