import { Navigate } from "react-router-dom";
import { LoginPage } from "../pages/login";
import { RouterLink } from "./routers";
import { ContactPage } from "../pages/contact";
import ProtectedOutlet from "./protected-outlet";
import { HomePage } from "../pages/home";
import { MainLayout } from "../layouts";

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
          {
            path: RouterLink.TROOP_REPORT,
            element: <HomePage />,
          },
          {
            path: RouterLink.LEAVE_APPROVE,
            element: <HomePage />,
          },
          {
            path: RouterLink.LEAVE_REGISTER,
            element: <HomePage />,
          },
          {
            path: RouterLink.MANAGER_GUARD_SETTING,
            element: <HomePage />,
          },
          {
            path: RouterLink.PERSONA_GUARD_SCHEDULE,
            element: <HomePage />,
          },
        ],
      },
    ],
  },
];

export default MainRoutes;
