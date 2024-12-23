export const routers = () => [
  {
    name: "Dashboard",
    layout: "/super-admin",
    path: "/dashboard",
    //   component: <AdminDashboard />,
  },
  {
    name: "Adminlar",
    layout: "/super-admin",
    path: "/admin",
    //   component: <AdminDashboard />,
  },
  {
    name: "Uchastkavoylar",
    layout: "/super-admin",
    path: "/offices",
    //   component: <AdminDashboard />,

  },
  {
    name: "Statistika",
    layout: "/super-admin",
    path: "/statistika",
    //   component: <AdminDashboard />,
  },
  {
    name: "Migrate",
    layout: "/manager",
    path: "/main",
    //   component: <AdminDashboard />,
  },
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/dashboard",
    //   component: <AdminDashboard />,
  },
  // {
  //   name: "Ma’lumot qo’shish",
  //   layout: "/admin",
  //   path: "/offices",
  //   //   component: <AdminDashboard />,
  // },
  {
    name: "Statistika",
    layout: "/admin",
    path: "/statistika",
    //   component: <AdminDashboard />,
  },
  {
    name: "Migrate",
    layout: "/uchaskavoy",
    path: "/main",
    //   component: <Uchaskavoy kichik uchaskavoy />,
  },
  {
    name: "Uchaskavoy",
    layout: "/manager",
    path: "/offices",
    //   component: <Kichik uchaskavoy />,
  },
];

