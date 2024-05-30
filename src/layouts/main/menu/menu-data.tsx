import {RouterLink} from "../../../routers/routers";
import {SideMenuItem, SystemAction, SystemFeatures} from "../../../types";

import {
  FaCalendar,
  FaCalendarCheck,
  FaChalkboardTeacher,
  FaHome,
  FaUserClock,
  FaUserFriends,
  FaWrench,
} from "react-icons/fa";
import {IoIosList, IoIosPeople, IoIosSettings} from "react-icons/io";

export const mainMenu: Array<SideMenuItem> = [
  // {
  //   url: RouterLink.HOME,
  //   key: RouterLink.HOME,
  //   icon: <FaHome />,
  //   children: [],
  //   text: "Trang chủ",
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
    icon: <FaCalendar />,
    text: "Huấn luyện chiến đấu",
    children: [
      {
        url: RouterLink.VAN_KIEN_ROUTE,
        key: RouterLink.VAN_KIEN_ROUTE,
        icon: <FaWrench />,
        children: [],
        text: "Văn kiện, mẫu biểu",
        module: SystemFeatures.ManagerDocuments,
        action: [SystemAction.View, SystemAction.Edit],
      },
      {
        url: RouterLink.TIEN_TRINH_BIEU_ROUTE,
        key: RouterLink.TIEN_TRINH_BIEU_ROUTE,
        icon: <FaWrench />,
        children: [],
        text: "Tiến trình biểu",
        module: SystemFeatures.ManagerProgresses,
        action: [SystemAction.View, SystemAction.Edit],
      },
      {
        url: RouterLink.THONG_KE_HUAN_LUYEN_ROUTE,
        key: RouterLink.THONG_KE_HUAN_LUYEN_ROUTE,
        icon: <FaWrench />,
        children: [],
        text: "Thống kê huấn luyện",
        module: SystemFeatures.ManagerTrainnings,
        action: [SystemAction.View, SystemAction.Edit],
      },
      {
        url: RouterLink.RUT_KINH_NGHIEM_ROUTE,
        key: RouterLink.RUT_KINH_NGHIEM_ROUTE,
        icon: <FaWrench />,
        children: [],
        text: "Rút kinh nghiệm huấn luyện",
        module: SystemFeatures.ManagerExperiences,
        action: [SystemAction.View, SystemAction.Edit],
      },
    ],
  },
  {
    url: RouterLink.GUARD_MENU,
    key: RouterLink.GUARD_MENU,
    icon: <FaCalendar />,
    text: "Sổ sách cá nhân",
    children: [
      {
        url: RouterLink.THONG_KE_HUAN_LUYEN_CA_NHAN,
        key: RouterLink.THONG_KE_HUAN_LUYEN_CA_NHAN,
        icon: <FaWrench />,
        children: [],
        text: "Sổ học tập chuyên ngành",
        module: SystemFeatures.ManagerPersonalDiarys,
        action: [SystemAction.View, SystemAction.Edit],
      },
    ],
  },
  // {
  //   url: RouterLink.GUARD_MENU,
  //   key: RouterLink.GUARD_MENU,
  //   icon: <FaCalendar />,
  //   text: "Quản lý xăng dầu",
  //   children: [
  //     {
  //       url: RouterLink.QUAN_LY_XE_ROUTE,
  //       key: RouterLink.QUAN_LY_XE_ROUTE,
  //       icon: <FaWrench />,
  //       children: [],
  //       text: "Quản lý xe",
  //       // module: SystemFeatures.ManagerPersonalDiarys,
  //       // action: [SystemAction.View, SystemAction.Edit],
  //     },
  //   ],
  // },
  {
    url: RouterLink.QUAN_TRI_NGUOI_DUNG_ROUTE,
    key: RouterLink.QUAN_TRI_NGUOI_DUNG_ROUTE,
    icon: <FaCalendar />,
    text: "Quản trị",
    children: [
      {
        url: RouterLink.QUAN_TRI_NGUOI_DUNG_ROUTE,
        key: RouterLink.QUAN_TRI_NGUOI_DUNG_ROUTE,
        icon: <FaWrench />,
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
