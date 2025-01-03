import {Navigate} from "react-router-dom";
import {LoginPage} from "../pages/login";
import {RouterLink} from "./routers";
import {ContactPage} from "../pages/contact";
import ProtectedOutlet from "./protected-outlet";
import {HomePage} from "../pages/home";
import {MainLayout} from "../layouts";
import {TroopReport} from "../pages/troop-report";
import {LeaveApprove} from "../pages/leave-approve";
import {LeaveRegister} from "../pages/leave-register";
import {GuardSetting} from "../pages/guard-dutty/guard-dutty-manager";
import {SystemFeatures, SystemAction, typeMeetingBook} from "../types";
import TienTrinh from "pages/tien-trinh-bieu/tien-trinh";
import User from "pages/admin/user";
import DetailTienTrinh from "pages/tien-trinh-bieu/chi-tiet-tien-trinh";
import ListThongKe from "pages/thong-ke-huan-luyen";
import RutKinhNghiem from "pages/rut-kinh-nghiem/list";
import DetailRutKinhNghiem from "pages/rut-kinh-nghiem/chi-tiet-rut-kinh-nghiem";
import ThongKeHLCaNhan from "pages/thong-ke-huan-luyen-ca-nhan";
import SoSach from "pages/so-sach";
import StatisticTienTrinh from "pages/tien-trinh-bieu/danh-gia-tien-trinh";
import VanKien from "pages/van-kien";
import {UpdateGuardDuttyPage} from "pages/guard-dutty/update-guard-dutty";
import Permission from "pages/admin/permission";
import Position from "pages/admin/position";
import Role from "pages/admin/role";
import {GuardDuttyUnitPage} from "pages/guard-dutty/guard-dutty-unit";
import {GuardDuttyPersonalPage} from "pages/guard-dutty/guard-dutty-personal";
import {UnitCalendarPage} from "pages/work-calendar/unit-calendar";
import {UserCalendarPage} from "pages/work-calendar/user-calendar";
import XacThucSSO from "pages/xac-thuc-sso";
import {PersonalReport} from "pages/troop-report/personal-report";
import QuanLyXe from "pages/quan-ly-xe/list";
import KeHoachXe from "pages/ke-hoach-xe/list";
import DetailKeHoachXe from "pages/ke-hoach-xe/detail";
import TongHopXe from "pages/tong-hop-xe/list";
import DetailTongHopXe from "pages/tong-hop-xe/detail";
import LenhXe from "pages/lenh-xe";
import PhieuXuat from "pages/phieu-xuat-xang";
import SoGiaoBanCum from "../pages/so-giao-ban-cum/list";
import DetailSoGiaoBanCum from "pages/so-giao-ban-cum/detail";
import QuanLyNhienLieu from "pages/quan-ly-nhien-lieu";
import QuanLyDauMoi from "pages/quan-ly-dau-moi";
import QuanLyNhiemVu from "pages/quan-ly-nhiem-vu";
import SoTheoDoiCongTac from "pages/so-theo-doi-cong-tac";
import SoTheoDoiKyLuat from "pages/so-theo-doi-ky-luat";
import SoThongKeTaiLieu from "pages/so-thong-ke-tai-tai-lieu";
import SoThongKeRaVao from "pages/so-thong-ke-ra-vao";
import ThongKeCtt from "pages/thong-ke-ctt";
import SoDienDen from "pages/so-dien-den";
import SoDienDi from "pages/so-dien-di";
import NguyenLieu from "pages/quan-ly-bep/nguyen-lieu";
import ThucDon from "pages/quan-ly-bep/thuc-don";
import {WorkCalendarManagerPage} from "pages/work-calendar/work-calendar-manager";
import UploadFile from "pages/upload-file";
import Unit from "../pages/admin/unit";
import PrintTienTrinh from "pages/tien-trinh-bieu/tien-trinh/print-tien-trinh";
import KeHoachThang from "pages/ke-hoach-thang";
import KeHoachThangDetail from "pages/ke-hoach-thang/detail";
import GiaoAn from "pages/giao-an";
import GiaoAnDetail from "pages/giao-an/detail";
import ThongQuaGiaoAn from "pages/thong-qua-giao-an";
const MainRoutes = [
  {path: "*", element: <Navigate to={RouterLink.LOGIN} replace />},
  {
    path: RouterLink.XAC_THUC_SSO,
    element: <XacThucSSO />,
  },
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
          // {
          //   path: RouterLink.TROOP_REPORT,
          //   element: <TroopReport />,
          //   module: SystemFeatures.TroopReports,
          //   action: [SystemAction.View, SystemAction.Report],
          // },
          // // {
          // //   path: RouterLink.PERSONAL_REPORT,
          // //   element: <PersonalReport />,
          // // },
          // {
          //   path: RouterLink.LEAVE_APPROVE,
          //   element: <LeaveApprove />,
          //   module: SystemFeatures.ManagerRegisterLeave,
          //   action: [SystemAction.Approve, SystemAction.UnitApprove],
          // },
          // {
          //   path: RouterLink.LEAVE_REGISTER,
          //   element: <LeaveRegister />,
          // },
          // {
          //   path: RouterLink.GUARD_DUTTY_UNIT,
          //   element: <GuardDuttyUnitPage />,
          // },
          // {
          //   path: RouterLink.UPDATE_GUARD_DUTTY,
          //   element: <UpdateGuardDuttyPage />,
          //   module: SystemFeatures.ManagerGuardDutty,
          //   action: [SystemAction.Edit],
          // },
          // {
          //   path: RouterLink.MANAGER_GUARD_SETTING,
          //   element: <GuardSetting />,
          //   module: SystemFeatures.ManagerGuardDutty,
          //   action: [SystemAction.View, SystemAction.Edit],
          // },
          // {
          //   path: RouterLink.PERSONAL_GUARD_SCHEDULE,
          //   element: <GuardDuttyPersonalPage />,
          // },
          // // lịch công tác
          // {
          //   path: RouterLink.MANAGER_CALENDAR,
          //   element: <WorkCalendarManagerPage />,
          //   module: SystemFeatures.WorkCalendar,
          //   action: [SystemAction.View, SystemAction.Edit],
          // },
          // {
          //   path: RouterLink.UNIT_WORK_CALENDAR,
          //   element: <UnitCalendarPage />,
          //   module: SystemFeatures.WorkCalendar,
          //   action: [SystemAction.View, SystemAction.Edit],
          // },
          // {
          //   path: RouterLink.USER_WORK_CALENDAR,
          //   element: <UserCalendarPage />,
          //   module: SystemFeatures.WorkCalendar,
          //   action: [SystemAction.View, SystemAction.Edit],
          // },
          // {
          //   path: RouterLink.VAN_KIEN_ROUTE,
          //   element: <VanKien />,
          //   module: SystemFeatures.ManagerDocuments,
          //   action: [SystemAction.View, SystemAction.Edit],
          // },
          // {
          //   path: RouterLink.TIEN_TRINH_BIEU_ROUTE,
          //   element: <TienTrinh />,
          //   module: SystemFeatures.ManagerProgresses,
          //   action: [SystemAction.View, SystemAction.Edit],
          // },
          // {
          //   path: RouterLink.TIEN_TRINH_BIEU_DETAIL_ROUTE,
          //   element: <DetailTienTrinh />,
          //   module: SystemFeatures.ManagerProgresses,
          //   action: [SystemAction.View, SystemAction.Edit],
          // },
          // {
          //   path: RouterLink.TIEN_TRINH_BIEU_CHECK_ROUTE,
          //   element: <StatisticTienTrinh />,
          //   module: SystemFeatures.ManagerProgresses,
          //   action: [SystemAction.View, SystemAction.Edit],
          // },
          // {
          //   path: RouterLink.THONG_KE_HUAN_LUYEN_ROUTE,
          //   element: <ListThongKe />,
          //   module: SystemFeatures.ManagerTrainnings,
          //   action: [SystemAction.View, SystemAction.Edit],
          // },
          // {
          //   path: RouterLink.RUT_KINH_NGHIEM_ROUTE,
          //   element: <RutKinhNghiem />,
          //   module: SystemFeatures.ManagerExperiences,
          //   action: [SystemAction.View, SystemAction.Edit],
          // },
          // {
          //   path: RouterLink.RUT_KINH_NGHIEM_DETAIL_ROUTE,
          //   element: <DetailRutKinhNghiem />,
          //   module: SystemFeatures.ManagerExperiences,
          //   action: [SystemAction.View, SystemAction.Edit],
          // },
          // {
          //   path: RouterLink.SO_GIAO_BAN_ROUTE,
          //   element: <SoGiaoBanCum />,
          // },
          // {
          //   path: RouterLink.SO_GIAO_BAN_DETAIL_ROUTE,
          //   element: <DetailSoGiaoBanCum />,
          // },
          // {
          //   path: RouterLink.SO_THEO_DOI_DI_CONG_TAC,
          //   element: <SoTheoDoiCongTac />,
          // },
          // {
          //   path: RouterLink.SO_THEO_DOI_KY_LUAT,
          //   element: <SoTheoDoiKyLuat />,
          // },
          // {
          //   path: RouterLink.SO_THONG_KE_TAI_LIEU,
          //   element: <SoThongKeTaiLieu />,
          // },
          // {
          //   path: RouterLink.SO_THONG_KE_RA_VAO,
          //   element: <SoThongKeRaVao />,
          // },
          // {
          //   path: RouterLink.THONG_KE_HUAN_LUYEN_CA_NHAN,
          //   element: <ThongKeHLCaNhan />,
          //   module: SystemFeatures.ManagerPersonalDiarys,
          //   action: [SystemAction.View, SystemAction.Edit],
          // },
          // {
          //   path: RouterLink.SO_SACH_CA_NHAN_DETAIL_ROUTE,
          //   element: <SoSach />,
          //   module: SystemFeatures.ManagerPersonalDiarys,
          //   action: [SystemAction.View, SystemAction.Edit],
          // },
          // {
          //   path: RouterLink.QUAN_TRI_NGUOI_DUNG_ROUTE,
          //   element: <User />,
          //   module: SystemFeatures.ManagerUsers,
          //   action: [SystemAction.View, SystemAction.Edit],
          // },
          // {
          //   path: RouterLink.QUAN_TRI_PERMISSION_ROUTE,
          //   element: <Permission />,
          //   module: SystemFeatures.ManagerPermission,
          //   action: [SystemAction.View, SystemAction.Edit],
          // },
          // {
          //   path: RouterLink.QUAN_TRI_CHUC_DANH_ROUTE,
          //   element: <Position />,
          //   module: SystemFeatures.ManagerPermission,
          //   action: [SystemAction.View, SystemAction.Edit],
          // },
          // {
          //   path: RouterLink.QUAN_TRI_ROLE_ROUTE,
          //   element: <Role />,
          //   module: SystemFeatures.ManagerRoles,
          //   action: [SystemAction.View, SystemAction.Edit],
          // },
          // {
          //   path: RouterLink.QUAN_TRI_DON_VI_ROUTE,
          //   element: <Unit />,
          //   module: SystemFeatures.ManagerUnits,
          //   action: [SystemAction.View, SystemAction.Edit],
          // },
          // {
          //   path: RouterLink.QUAN_LY_XE_ROUTE,
          //   element: <QuanLyXe />,
          // },
          // {
          //   path: RouterLink.QUAN_LY_NHIEN_LIEU_ROUTE,
          //   element: <QuanLyNhienLieu />,
          // },
          // {
          //   path: RouterLink.QUAN_LY_DAU_MOI_ROUTE,
          //   element: <QuanLyDauMoi />,
          // },
          // {
          //   path: RouterLink.QUAN_LY_NHIEM_VU_ROUTE,
          //   element: <QuanLyNhiemVu />,
          // },
          // {
          //   path: RouterLink.QUAN_LY_KE_HOACH_XE_ROUTE,
          //   element: <KeHoachXe />,
          // },
          // {
          //   path: RouterLink.QUAN_LY_KE_HOACH_XE_DETAIL_ROUTE,
          //   element: <DetailKeHoachXe />,
          // },
          // {
          //   path: RouterLink.QUAN_LY_TONG_HOP_XE_ROUTE,
          //   element: <TongHopXe />,
          // },
          // {
          //   path: RouterLink.QUAN_LY_TONG_HOP_XE_DETAIL_ROUTE,
          //   element: <DetailTongHopXe />,
          // },
          // {
          //   path: RouterLink.QUAN_LY_LENH_XE_ROUTE,
          //   element: <LenhXe />,
          // },
          // {
          //   path: RouterLink.QUAN_LY_PHIEU_XUAT_XANG_ROUTE,
          //   element: <PhieuXuat />,
          // },
          // {
          //   path: RouterLink.THONG_KE_CTT,
          //   element: <ThongKeCtt />,
          // },
          // {
          //   path: RouterLink.SO_DIEN_DEN,
          //   element: <SoDienDen />,
          // },
          // {
          //   path: RouterLink.SO_DIEN_DI,
          //   element: <SoDienDi />,
          // },
          // {
          //   path: RouterLink.NGUYEN_LIEU,
          //   element: <NguyenLieu />,
          // },
          // {
          //   path: RouterLink.THUC_DON,
          //   element: <ThucDon />,
          // },
          {
            path: RouterLink.TRAINING, // Công tác tham mưu huấn luyện
            element: <Navigate to={RouterLink.PLAN} replace />,
          },
          {
            path: RouterLink.TIEN_TRINH_BIEU_ROUTE, // Kế hoạch, tiến trình biểu
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
            path: RouterLink.UPLOAD_TAI_LIEU, // Kế hoạch huấn luyện năm
            element: <UploadFile />,
            // module: SystemFeatures.ManagerProgresses,
            // action: [SystemAction.View, SystemAction.Edit],
          },

          {
            path: RouterLink.PLAN_MONTH, // Kế hoạch huấn luyện tháng
            element: <KeHoachThang />,
            // module: SystemFeatures.ManagerProgresses,
            // action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.PLAN_MONTH_DETAIL, // Kế hoạch huấn luyện tháng
            element: <KeHoachThangDetail />,
            // module: SystemFeatures.ManagerProgresses,
            // action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.TIEN_TRINH_BIEU_ROUTE, // Tiến trình biểu huấn luyện tuần
            element: <TienTrinh />,
            module: SystemFeatures.ManagerProgresses,
            action: [SystemAction.View, SystemAction.Edit],
          },

          {
            path: RouterLink.STATS, // Thống kê huấn luyện
            element: <ListThongKe />,
            module: SystemFeatures.ManagerTrainnings,
            action: [SystemAction.View, SystemAction.Edit],
          },

          {
            path: RouterLink.DOCS, // Giáo án, thông qua giáo án
            element: <Navigate to={RouterLink.DOCS_APPROVE} replace />,
          },
          {
            path: RouterLink.DOCS_APPROVE, // Thông qua giáo án
            element: <ThongQuaGiaoAn />,
            module: SystemFeatures.ManagerDocuments,
            action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.DOCS_TRAIN, // Giáo án huấn luyện
            element: <GiaoAn />,
            module: SystemFeatures.ManagerDocuments,
            action: [SystemAction.View, SystemAction.Edit],
          },

          {
            path: RouterLink.THONG_KE_HUAN_LUYEN_CA_NHAN, // Sổ học tập cá nhân
            element: <ThongKeHLCaNhan />,
            module: SystemFeatures.ManagerPersonalDiarys,
            action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.SO_SACH_CA_NHAN_DETAIL_ROUTE, // Sổ học tập cá nhân
            element: <SoSach />,
            module: SystemFeatures.ManagerPersonalDiarys,
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
