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
import { GuardSetting } from "../pages/guard-dutty/guard-dutty-manager";
import { PersonalGuardSchedule } from "../pages/personal-guard-schedule";
import { SystemFeatures, SystemAction } from "../types";
import TienTrinh from "pages/tien-trinh-bieu/tien-trinh";
import User from "pages/admin/user";
import DetailTienTrinh from "pages/tien-trinh-bieu/chi-tiet-tien-trinh";
import ListThongKe from "pages/thong-ke-huan-luyen";
import RutKinhNghiem from "pages/rut-kinh-nghiem/list";
import DetailRutKinhNghiem from "pages/rut-kinh-nghiem/chi-tiet-rut-kinh-nghiem";
import ThongKeHLCaNhan from "pages/thong-ke-huan-luyen-ca-nhan";
import SoSach from "pages/so-sach";
import StatisticTienTrinh from "pages/tien-trinh-bieu/danh-gia-tien-trinh";
import VanKien from "pages/VanKien";
import { UpdateGuardDuttyPage } from "pages/guard-dutty/update-guard-dutty";
import Permission from "pages/admin/permission";
import Position from "pages/admin/position";
import Role from "pages/admin/role";
import Unit from "pages/admin/Unit";

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
            path: RouterLink.GUARD_DUTTY_UNIT,
            element: <PersonalGuardSchedule />,
          },
          {
            path: RouterLink.UPDATE_GUARD_DUTTY,
            element: <UpdateGuardDuttyPage />,
            module: SystemFeatures.ManagerGuardDutty,
            action: [SystemAction.Edit],
          },
          {
            path: RouterLink.MANAGER_GUARD_SETTING,
            element: <GuardSetting />,
            module: SystemFeatures.ManagerGuardDutty,
            action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.PERSONAL_GUARD_SCHEDULE,
            element: <PersonalGuardSchedule />,
          },
          {
            path: RouterLink.VAN_KIEN_ROUTE,
            element: <VanKien />,
            module: SystemFeatures.ManagerDocuments,
            action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.TIEN_TRINH_BIEU_ROUTE,
            element: <TienTrinh />,
            module: SystemFeatures.ManagerProgresses,
            action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.TIEN_TRINH_BIEU_DETAIL_ROUTE,
            element: <DetailTienTrinh />,
            module: SystemFeatures.ManagerProgresses,
            action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.TIEN_TRINH_BIEU_CHECK_ROUTE,
            element: <StatisticTienTrinh />,
            module: SystemFeatures.ManagerProgresses,
            action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.THONG_KE_HUAN_LUYEN_ROUTE,
            element: <ListThongKe />,
            module: SystemFeatures.ManagerTrainnings,
            action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.RUT_KINH_NGHIEM_ROUTE,
            element: <RutKinhNghiem />,
            module: SystemFeatures.ManagerExperiences,
            action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.RUT_KINH_NGHIEM_DETAIL_ROUTE,
            element: <DetailRutKinhNghiem />,
            module: SystemFeatures.ManagerExperiences,
            action: [SystemAction.View, SystemAction.Edit],
          },

          {
            path: RouterLink.THONG_KE_HUAN_LUYEN_CA_NHAN,
            element: <ThongKeHLCaNhan />,
            module: SystemFeatures.ManagerPersonalDiarys,
            action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.SO_SACH_CA_NHAN_DETAIL_ROUTE,
            element: <SoSach />,
            module: SystemFeatures.ManagerPersonalDiarys,
            action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.QUAN_TRI_NGUOI_DUNG_ROUTE,
            element: <User />,
            module: SystemFeatures.ManagerUsers,
            action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.QUAN_TRI_PERMISSION_ROUTE,
            element: <Permission />,
            module: SystemFeatures.ManagerPermission,
            action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.QUAN_TRI_CHUC_DANH_ROUTE,
            element: <Position />,
            module: SystemFeatures.ManagerPermission,
            action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.QUAN_TRI_ROLE_ROUTE,
            element: <Role />,
            module: SystemFeatures.ManagerRoles,
            action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.QUAN_TRI_DON_VI_ROUTE,
            element: <Unit />,
            module: SystemFeatures.ManagerUnits,
            action: [SystemAction.View, SystemAction.Edit],
          },
        ],
      },
    ],
  },
];

export default MainRoutes;
