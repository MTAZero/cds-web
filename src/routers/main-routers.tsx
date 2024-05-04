import { Navigate } from "react-router-dom";
import { LoginPage } from "../pages/login";
import { RouterLink } from "./routers";
import { ContactPage } from "../pages/contact";
import ProtectedOutlet from "./protected-outlet";
import { HomePage } from "../pages/home";
import { MainLayout } from "../layouts";
import { TroopReport } from "../pages/troop-report";
import { LeaveApprove } from "../pages/leave-approve";
import { LeaveRegister } from "../pages/leave-register";
import { GuardSetting } from "../pages/guard-setting";
import { PersonalGuardSchedule } from "../pages/personal-guard-schedule";
import { SystemFeatures, SystemAction } from "../types";

const MainRoutes = [
  { path: "*", element: <Navigate to={RouterLink.LOGIN} replace /> },
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
            element: <TroopReport />,
            module: SystemFeatures.TroopReports,
            action: [SystemAction.View, SystemAction.Report],
          },
          {
            path: RouterLink.LEAVE_APPROVE,
            element: <LeaveApprove />,
            module: SystemFeatures.ManagerRegisterLeave,
            action: [SystemAction.Approve, SystemAction.UnitApprove],
          },
          {
            path: RouterLink.LEAVE_REGISTER,
            element: <LeaveRegister />,
          },
          {
            path: RouterLink.MANAGER_GUARD_SETTING,
            element: <GuardSetting />,
            module: SystemFeatures.ManagerDuttySetting,
            action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.PERSONAL_GUARD_SCHEDULE,
            element: <PersonalGuardSchedule />,
          },
        ],
      },
    ],
  },
];

export default MainRoutes;
