import { Navigate } from "react-router-dom";
import { LoginPage } from "../pages/login";
import { RouterLink } from "./routers";
import { ContactPage } from "../pages/contact";
import ProtectedOutlet from "./protected-outlet";
import { MainLayout } from "../layouts/main";
import { HomePage } from "../pages/home";

const MainRoutes = [
  { path: "", element: <Navigate to={RouterLink.LOGIN} replace /> },
  {
    path: RouterLink.LOGIN,
    element: <LoginPage />,
  },
  {
    key: "private",
    path: "",
    element: <ProtectedOutlet requireLogin={true} />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            path: RouterLink.HOME,
            element: <HomePage />,
          },
          {
            path: RouterLink.CONTACT,
            element: <ContactPage />,
          },
        ],
      },
    ],
  },
];

export default MainRoutes;
