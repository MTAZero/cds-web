import { Navigate } from "react-router-dom";
import { LoginPage } from "../pages/login";
import { RouterLink } from "./routers";
import { ContactPage } from "../pages/contact";
import ProtectedOutlet from "./protected-outlet";
import { MainLayout } from "../layouts/main";

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
        path: RouterLink.HOME,
        element: <LoginPage />,
      },
      {
        path: "",
        element: <MainLayout />,
        children: [
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
