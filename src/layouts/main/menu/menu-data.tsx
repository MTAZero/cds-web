import {
  AdminSVG,
  BookSVG,
  CarSVG,
  DocumentSVG,
  DocumentTextSVG,
  NotebookSVG,
  OilSVG,
  UserSVG,
} from "assests/svg";
import {RouterLink} from "../../../routers/routers";
import {
  SideMenuItem,
  SystemAction,
  SystemFeatures,
  typeMeetingBook,
} from "../../../types";

import {
  FaCalendar,
  FaCalendarCheck,
  FaChalkboardTeacher,
  FaHome,
  FaUserClock,
  FaUserFriends,
  FaWrench,
} from "react-icons/fa";
import {IoIosArchive, IoIosBook, IoIosList, IoIosPeople, IoIosSettings} from "react-icons/io";

export const mainMenu: Array<SideMenuItem> = [
  // {
  //   url: RouterLink.HOME,
  //   key: RouterLink.HOME,
  //   icon: <FaHome />,
  //   children: [],
  //   text: "Trang chủ",
  // },
  {
    url: RouterLink.TROOP,
    key: RouterLink.TROOP,
    icon: <FaUserFriends />,
    text: "Quân số",
    children: [
      // {
      //   url: RouterLink.PERSONAL_REPORT,
      //   key: RouterLink.PERSONAL_REPORT,
      //   icon: <FaUserFriends />,
      //   children: [],
      //   text: "Cá nhân dự kiến",
      // },
      {
        url: RouterLink.TROOP_REPORT,
        key: RouterLink.TROOP_REPORT,
        icon: <FaUserFriends />,
        children: [],
        text: "Báo quân số",
        module: SystemFeatures.TroopReports,
        action: [SystemAction.View, SystemAction.Report],
      },
    ],
  },
  // {
  //   url: RouterLink.LEAVE_MENU,
  //   key: RouterLink.LEAVE_MENU,
  //   icon: <FaCalendarCheck />,
  //   text: "Nghỉ phép",
  //   children: [
  //     {
  //       url: RouterLink.LEAVE_REGISTER,
  //       key: RouterLink.LEAVE_REGISTER,
  //       icon: <FaBook />,
  //       children: [],
  //       text: "Đăng ký nghỉ phép",
  //     },
  //     {
  //       url: RouterLink.LEAVE_APPROVE,
  //       key: RouterLink.LEAVE_APPROVE,
  //       icon: <FaCheck />,
  //       children: [],
  //       text: "Phê duyệt nghỉ phép",
  //       module: SystemFeatures.ManagerRegisterLeave,
  //       action: [SystemAction.Approve, SystemAction.UnitApprove],
  //     },
  //   ],
  // },
  {
    url: RouterLink.GUARD_MENU,
    key: RouterLink.GUARD_MENU,
    icon: <FaCalendar />,
    text: "Lịch trực",
    children: [
      {
        url: RouterLink.MANAGER_GUARD_SETTING,
        key: RouterLink.MANAGER_GUARD_SETTING,
        icon: <IoIosSettings />,
        children: [],
        text: "Quản lý vị trí trực",
        module: SystemFeatures.ManagerGuardDutty,
        action: [SystemAction.View, SystemAction.Edit],
      },
      {
        url: RouterLink.UPDATE_GUARD_DUTTY,
        key: RouterLink.UPDATE_GUARD_DUTTY,
        icon: <FaChalkboardTeacher />,
        children: [],
        text: "Cắt lịch trực",
        module: SystemFeatures.ManagerGuardDutty,
        action: [SystemAction.Edit],
      },
      {
        url: RouterLink.GUARD_DUTTY_UNIT,
        key: RouterLink.GUARD_DUTTY_UNIT,
        icon: <FaCalendarCheck />,
        children: [],
        text: "Lịch trực trung tâm",
      },
      {
        url: RouterLink.PERSONAL_GUARD_SCHEDULE,
        key: RouterLink.PERSONAL_GUARD_SCHEDULE,
        icon: <FaUserClock />,
        children: [],
        text: "Lịch trực cá nhân",
      },
    ],
  },

  {
    url: RouterLink.WORK_CALENDAR,
    key: RouterLink.WORK_CALENDAR,
    icon: <FaCalendar />,
    text: "Lịch công tác",
    children: [
      {
        url: RouterLink.MANAGER_CALENDAR,
        key: RouterLink.MANAGER_CALENDAR,
        icon: <IoIosBook />,
        children: [],
        text: "Quản lý lịch công tác",
        module: SystemFeatures.WorkCalendar,
        action: [SystemAction.View, SystemAction.Edit],
      },
      {
        url: RouterLink.UNIT_WORK_CALENDAR,
        key: RouterLink.UNIT_WORK_CALENDAR,
        icon: <IoIosList />,
        children: [],
        text: "Lịch công tác đơn vị",
        module: SystemFeatures.WorkCalendar,
        action: [SystemAction.View, SystemAction.Edit],
      },
      {
        url: RouterLink.USER_WORK_CALENDAR,
        key: RouterLink.USER_WORK_CALENDAR,
        icon: <IoIosPeople />,
        children: [],
        text: "Lịch công tác cá nhân",
        module: SystemFeatures.WorkCalendar,
        action: [SystemAction.View, SystemAction.Edit],
      },
    ],
  },

  {
    url: RouterLink.TIEN_TRINH_BIEU_ROUTE,
    key: RouterLink.TIEN_TRINH_BIEU_ROUTE,
    icon: <BookSVG />,
    text: "Huấn luyện chiến đấu",
    children: [
      {
        url: RouterLink.VAN_KIEN_ROUTE,
        key: RouterLink.VAN_KIEN_ROUTE,
        icon: <DocumentTextSVG />,
        children: [],
        text: "Văn kiện, mẫu biểu",
        module: SystemFeatures.ManagerDocuments,
        action: [SystemAction.View, SystemAction.Edit],
      },
      {
        url: RouterLink.TIEN_TRINH_BIEU_ROUTE,
        key: RouterLink.TIEN_TRINH_BIEU_ROUTE,
        icon: <DocumentTextSVG />,
        children: [],
        text: "Tiến trình biểu",
        module: SystemFeatures.ManagerProgresses,
        action: [SystemAction.View, SystemAction.Edit],
      },
      {
        url: RouterLink.THONG_KE_HUAN_LUYEN_ROUTE,
        key: RouterLink.THONG_KE_HUAN_LUYEN_ROUTE,
        icon: <DocumentTextSVG />,
        children: [],
        text: "Thống kê huấn luyện",
        module: SystemFeatures.ManagerTrainnings,
        action: [SystemAction.View, SystemAction.Edit],
      },
      {
        url: RouterLink.RUT_KINH_NGHIEM_ROUTE,
        key: RouterLink.RUT_KINH_NGHIEM_ROUTE,
        icon: <DocumentTextSVG />,
        children: [],
        text: "Rút kinh nghiệm huấn luyện",
        module: SystemFeatures.ManagerExperiences,
        action: [SystemAction.View, SystemAction.Edit],
      },
      {
        url: RouterLink.SO_GIAO_BAN_ROUTE.replace(
          ":type",
          typeMeetingBook.TRUNG_TAM
        ),
        key: RouterLink.SO_GIAO_BAN_ROUTE.replace(
          ":type",
          typeMeetingBook.TRUNG_TAM
        ),
        icon: <DocumentTextSVG />,
        children: [],
        text: "Sổ giao ban trung tâm",
      },
      {
        url: RouterLink.SO_GIAO_BAN_ROUTE.replace(":type", typeMeetingBook.CUM),
        key: RouterLink.SO_GIAO_BAN_ROUTE.replace(":type", typeMeetingBook.CUM),
        icon: <DocumentTextSVG />,
        children: [],
        text: "Sổ giao ban cụm",
      },
      {
        url: RouterLink.SO_GIAO_BAN_ROUTE.replace(":type", typeMeetingBook.DOI),
        key: RouterLink.SO_GIAO_BAN_ROUTE.replace(":type", typeMeetingBook.DOI),
        icon: <DocumentTextSVG />,
        children: [],
        text: "Sổ giao ban đội",
      },
    ],
  },
  {
    url: RouterLink.GUARD_MENU,
    key: RouterLink.GUARD_MENU,
    icon: <NotebookSVG />,
    text: "Sổ sách cá nhân",
    children: [
      {
        url: RouterLink.THONG_KE_HUAN_LUYEN_CA_NHAN,
        key: RouterLink.THONG_KE_HUAN_LUYEN_CA_NHAN,
        icon: <NotebookSVG />,
        children: [],
        text: "Sổ học tập chuyên ngành",
        module: SystemFeatures.ManagerPersonalDiarys,
        action: [SystemAction.View, SystemAction.Edit],
      },
    ],
  },
  {
    url: RouterLink.GUARD_MENU,
    key: RouterLink.GUARD_MENU,
    icon: <OilSVG />,
    text: "Quản lý xăng dầu",
    children: [
      {
        url: RouterLink.QUAN_LY_XE_ROUTE,
        key: RouterLink.QUAN_LY_XE_ROUTE,
        icon: <CarSVG />,
        children: [
          {
            url: RouterLink.QUAN_LY_XE_ROUTE,
            key: RouterLink.QUAN_LY_XE_ROUTE,
            icon: null,
            children: [],
            text: "Danh mục xe",
          },
          {
            url: RouterLink.QUAN_LY_NHIEN_LIEU_ROUTE,
            key: RouterLink.QUAN_LY_NHIEN_LIEU_ROUTE,
            icon: null,
            children: [],
            text: "Danh mục nhiên liệu",
          },
          {
            url: RouterLink.QUAN_LY_NHIEM_VU_ROUTE,
            key: RouterLink.QUAN_LY_NHIEM_VU_ROUTE,
            icon: null,
            children: [],
            text: "Danh mục nhiệm vụ",
          },
          {
            url: RouterLink.QUAN_LY_DAU_MOI_ROUTE,
            key: RouterLink.QUAN_LY_DAU_MOI_ROUTE,
            icon: null,
            children: [],
            text: "Danh mục đầu mối",
          },
        ],
        text: "Quản lý danh mục",
        // module: SystemFeatures.ManagerPersonalDiarys,
        // action: [SystemAction.View, SystemAction.Edit],
      },
      {
        url: RouterLink.QUAN_LY_TONG_HOP_XE_ROUTE,
        key: RouterLink.QUAN_LY_TONG_HOP_XE_ROUTE,
        icon: <CarSVG />,
        children: [
          {
            url: RouterLink.QUAN_LY_TONG_HOP_XE_ROUTE,
            key: RouterLink.QUAN_LY_TONG_HOP_XE_ROUTE,
            icon: null,
            children: [],
            text: "Đăng kí xe",
          },
          {
            url: RouterLink.QUAN_LY_KE_HOACH_XE_ROUTE,
            key: RouterLink.QUAN_LY_KE_HOACH_XE_ROUTE,
            icon: null,
            children: [],
            text: "Kế hoạch xe",
            // module: SystemFeatures.ManagerPersonalDiarys,
            // action: [SystemAction.View, SystemAction.Edit],
          },
          {
            url: RouterLink.QUAN_LY_LENH_XE_ROUTE,
            key: RouterLink.QUAN_LY_LENH_XE_ROUTE,
            icon: null,
            children: [],
            text: "Lệnh điều phương tiện",
            // module: SystemFeatures.ManagerPersonalDiarys,
            // action: [SystemAction.View, SystemAction.Edit],
          },
          {
            url: RouterLink.QUAN_LY_PHIEU_XUAT_XANG_ROUTE,
            key: RouterLink.QUAN_LY_PHIEU_XUAT_XANG_ROUTE,
            icon: null,
            children: [],
            text: "Phiếu xuất xăng dầu",
            // module: SystemFeatures.ManagerPersonalDiarys,
            // action: [SystemAction.View, SystemAction.Edit],
          },
        ],
        text: "Quản lý nhập/xuất",
      },
    ],
  },
  {
    url: RouterLink.QUAN_TRI_NGUOI_DUNG_ROUTE,
    key: RouterLink.QUAN_TRI_NGUOI_DUNG_ROUTE,
    icon: <AdminSVG />,
    text: "Quản trị",
    children: [
      {
        url: RouterLink.QUAN_TRI_NGUOI_DUNG_ROUTE,
        key: RouterLink.QUAN_TRI_NGUOI_DUNG_ROUTE,
        icon: <UserSVG />,
        children: [],
        text: "Người dùng",
        module: SystemFeatures.ManagerUsers,
        action: [SystemAction.View, SystemAction.Edit],
      },
      {
        url: RouterLink.QUAN_TRI_PERMISSION_ROUTE,
        key: RouterLink.QUAN_TRI_PERMISSION_ROUTE,
        icon: <FaWrench />,
        children: [],
        text: "Quyền",
        module: SystemFeatures.ManagerPermission,
        action: [SystemAction.View, SystemAction.Edit],
      },
      {
        url: RouterLink.QUAN_TRI_CHUC_DANH_ROUTE,
        key: RouterLink.QUAN_TRI_CHUC_DANH_ROUTE,
        icon: <FaWrench />,
        children: [],
        text: "Chức vụ",
        module: SystemFeatures.ManagerPositions,
        action: [SystemAction.View, SystemAction.Edit],
      },
      {
        url: RouterLink.QUAN_TRI_ROLE_ROUTE,
        key: RouterLink.QUAN_TRI_ROLE_ROUTE,
        icon: <FaWrench />,
        children: [],
        text: "Vai trò",
        module: SystemFeatures.ManagerRoles,
        action: [SystemAction.View, SystemAction.Edit],
      },
      {
        url: RouterLink.QUAN_TRI_DON_VI_ROUTE,
        key: RouterLink.QUAN_TRI_DON_VI_ROUTE,
        icon: <FaWrench />,
        children: [],
        text: "Đơn vị",
        module: SystemFeatures.ManagerUnits,
        action: [SystemAction.View, SystemAction.Edit],
      },
    ],
  },

  // {
  //   url: RouterLink.CONTACT,
  //   key: RouterLink.CONTACT,
  //   icon: <FaPhone />,
  //   children: [],
  //   text: "Liên hệ",
  // },
];
