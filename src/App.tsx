import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import "./index.css";
import LoginPage from "./app/auth/login/login";
import Navbar from "./components/navbar";
import Dashboard from "./app/superAdmin/dashboard";
import Adminlar from "./app/superAdmin/adminlar/adminlar";
import Manager from "./app/superAdmin/manger/adminlar";
import Officer from "./app/officer/officer/officer";
import { useEffect, useState } from "react";
import KichikOfficer from "./app/kichikOfficer/officer";
import UchaskavoyKichik from "./app/kichikOfficer/kichikUchaskavoy/adminlar";
import i18next from "i18next";
import {initReactI18next, useTranslation} from "react-i18next";
import uzJson from '../public/translate/uz.json';
import ruJson from '../public/translate/ru.json';
import krillJson from '../public/translate/krill.json';
import NewStatistika from "./app/superAdmin/statistika/newStatistika";
import {clear} from "./helpers/constants/const.ts";

i18next.use(initReactI18next).init({
  resources: {
    uz: { translation: uzJson },
    ru: { translation: ruJson },
    krill: { translation: krillJson },
  },
  lng: "uz",
  fallbackLng: "uz",
});

function App() {
  const {t} = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const ROLE = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");
  const [languageData, setLanguageData] = useState(localStorage.getItem('languages') || 'uz');
  const routers = () => [
    {
      name: t("Dashboard"),
      layout: "/super-admin",
      path: "/dashboard",
    },
    {
      name: t("Adminlar"),
      layout: "/super-admin",
      path: "/admin",
    },
    {
      name: t("Uchastkavoylar"),
      layout: "/super-admin",
      path: "/offices",

    },
    {
      name: t("Statistika"),
      layout: "/super-admin",
      path: "/statistika",
    },
    {
      name: t("Migrate"),
      layout: "/manager",
      path: "/main",
    },
    {
      name: t("Dashboard"),
      layout: "/admin",
      path: "/dashboard",
    },
    {
      name: t("Statistika"),
      layout: "/admin",
      path: "/statistika",
    },
    {
      name: t("Migrate"),
      layout: "/uchaskavoy",
      path: "/main",
    },
    {
      name: t("Uchaskavoy"),
      layout: "/manager",
      path: "/offices",
    },
  ];

  useEffect(() => {
    if (!token) navigate("/");

    setTimeout(() => {
      clear();
    }, 8000)
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("languages", languageData)
    i18next.changeLanguage(languageData);
  }, [languageData]);

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
            : [];

  return (
    <>
      {location.pathname !== "/" && <Navbar navigation={filteredRoutes} setLanguageData={setLanguageData} />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/super-admin/dashboard" element={<Dashboard />} />
        <Route path="/super-admin/statistika" element={<NewStatistika />} />
        <Route path="/super-admin/offices" element={<Manager />} />
        <Route path="/super-admin/admin" element={<Adminlar />} />
        <Route path="/manager/main" element={<Officer />} />
        <Route path="/uchaskavoy/main" element={<KichikOfficer />} />
        <Route path="/manager/offices" element={<UchaskavoyKichik />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/offices" element={<Officer />} />
        <Route path="/admin/statistika" element={<NewStatistika />} />
      </Routes>
    </>
  );
}

export default App;
