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
import {
  IoIosArchive,
  IoIosBook,
  IoIosCalendar,
  IoIosCheckmark,
  IoIosClipboard,
  IoIosJournal,
  IoIosList,
  IoIosPaper,
  IoIosPeople,
  IoIosSchool,
  IoIosSettings,
  IoIosStats,
} from "react-icons/io";

export const mainMenu: Array<SideMenuItem> = [
  // {
  //   url: RouterLink.HOME,
  //   key: RouterLink.HOME,
  //   icon: <FaHome />,
  //   children: [],
  //   text: "Trang chủ",
  // },
  // {
  //   url: RouterLink.TROOP,
  //   key: RouterLink.TROOP,
  //   icon: <FaUserFriends />,
  //   text: "Quân số",
  //   children: [
  //     // {
  //     //   url: RouterLink.PERSONAL_REPORT,
  //     //   key: RouterLink.PERSONAL_REPORT,
  //     //   icon: <FaUserFriends />,
  //     //   children: [],
  //     //   text: "Cá nhân dự kiến",
  //     // },
  //     {
  //       url: RouterLink.TROOP_REPORT,
  //       key: RouterLink.TROOP_REPORT,
  //       icon: <FaUserFriends />,
  //       children: [],
  //       text: "Báo quân số",
  //       module: SystemFeatures.TroopReports,
  //       action: [SystemAction.View, SystemAction.Report],
  //     },
  //   ],
  // },
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
  // {
  //   url: RouterLink.GUARD_MENU,
  //   key: RouterLink.GUARD_MENU,
  //   icon: <FaCalendar />,
  //   text: "Lịch trực",
  //   children: [
  //     {
  //       url: RouterLink.MANAGER_GUARD_SETTING,
  //       key: RouterLink.MANAGER_GUARD_SETTING,
  //       icon: <IoIosSettings />,
  //       children: [],
  //       text: "Quản lý vị trí trực",
  //       module: SystemFeatures.ManagerGuardDutty,
  //       action: [SystemAction.View, SystemAction.Edit],
  //     },
  //     {
  //       url: RouterLink.UPDATE_GUARD_DUTTY,
  //       key: RouterLink.UPDATE_GUARD_DUTTY,
  //       icon: <FaChalkboardTeacher />,
  //       children: [],
  //       text: "Cắt lịch trực",
  //       module: SystemFeatures.ManagerGuardDutty,
  //       action: [SystemAction.Edit],
  //     },
  //     {
  //       url: RouterLink.GUARD_DUTTY_UNIT,
  //       key: RouterLink.GUARD_DUTTY_UNIT,
  //       icon: <FaCalendarCheck />,
  //       children: [],
  //       text: "Lịch trực trung tâm",
  //     },
  //     {
  //       url: RouterLink.PERSONAL_GUARD_SCHEDULE,
  //       key: RouterLink.PERSONAL_GUARD_SCHEDULE,
  //       icon: <FaUserClock />,
  //       children: [],
  //       text: "Lịch trực cá nhân",
  //     },
  //   ],
  // },
  // {
  //   url: RouterLink.THONG_KE_CTT,
  //   key: RouterLink.THONG_KE_CTT,
  //   icon: <AdminSVG />,
  //   text: "Thống kê cổng thông tin",
  //   children: [],
  //   module: SystemFeatures.ViewStatisticPage,
  //   action: [SystemAction.View],
  // },
  // {
  //   url: RouterLink.WORK_CALENDAR,
  //   key: RouterLink.WORK_CALENDAR,
  //   icon: <FaCalendar />,
  //   text: "Quản lý bếp ăn",
  //   children: [
  //     {
  //       url: RouterLink.NGUYEN_LIEU,
  //       key: RouterLink.NGUYEN_LIEU,
  //       icon: <IoIosBook />,
  //       children: [],
  //       text: "Nguyên liệu",
  //       // module: SystemFeatures.WorkCalendar,
  //       // action: [SystemAction.View, SystemAction.Edit],
  //     },
  //     {
  //       url: RouterLink.THUC_DON,
  //       key: RouterLink.THUC_DON,
  //       icon: <IoIosBook />,
  //       children: [],
  //       text: "Thực đơn",
  //       // module: SystemFeatures.WorkCalendar,
  //       // action: [SystemAction.View, SystemAction.Edit],
  //     },
  //   ],
  // },
  //
  // {
  //   url: RouterLink.WORK_CALENDAR,
  //   key: RouterLink.WORK_CALENDAR,
  //   icon: <FaCalendar />,
  //   text: "Lịch công tác",
  //   children: [
  //     {
  //       url: RouterLink.MANAGER_CALENDAR,
  //       key: RouterLink.MANAGER_CALENDAR,
  //       icon: <IoIosBook />,
  //       children: [],
  //       text: "Quản lý lịch công tác",
  //       module: SystemFeatures.WorkCalendar,
  //       action: [SystemAction.View, SystemAction.Edit],
  //     },
  //     {
  //       url: RouterLink.UNIT_WORK_CALENDAR,
  //       key: RouterLink.UNIT_WORK_CALENDAR,
  //       icon: <IoIosList />,
  //       children: [],
  //       text: "Lịch công tác đơn vị",
  //       module: SystemFeatures.WorkCalendar,
  //       action: [SystemAction.View, SystemAction.Edit],
  //     },
  //     {
  //       url: RouterLink.USER_WORK_CALENDAR,
  //       key: RouterLink.USER_WORK_CALENDAR,
  //       icon: <IoIosPeople />,
  //       children: [],
  //       text: "Lịch công tác cá nhân",
  //       module: SystemFeatures.WorkCalendar,
  //       action: [SystemAction.View, SystemAction.Edit],
  //     },
  //   ],
  // },
  //
  // {
  //   url: RouterLink.TIEN_TRINH_BIEU_ROUTE,
  //   key: RouterLink.TIEN_TRINH_BIEU_ROUTE,
  //   icon: <BookSVG />,
  //   text: "Huấn luyện chiến đấu",
  //   module: SystemFeatures.ManagerProgresses,
  //   action: [SystemAction.View, SystemAction.Edit],
  //
  //   children: [
  //     {
  //       url: RouterLink.VAN_KIEN_ROUTE,
  //       key: RouterLink.VAN_KIEN_ROUTE,
  //       icon: <DocumentTextSVG />,
  //       children: [],
  //       text: "Văn kiện, mẫu biểu",
  //       module: SystemFeatures.ManagerDocuments,
  //       action: [SystemAction.View, SystemAction.Edit],
  //     },
  //     {
  //       url: RouterLink.TIEN_TRINH_BIEU_ROUTE,
  //       key: RouterLink.TIEN_TRINH_BIEU_ROUTE,
  //       icon: <DocumentTextSVG />,
  //       children: [],
  //       text: "Tiến trình biểu",
  //       module: SystemFeatures.ManagerProgresses,
  //       action: [SystemAction.View, SystemAction.Edit],
  //     },
  //     {
  //       url: RouterLink.THONG_KE_HUAN_LUYEN_ROUTE,
  //       key: RouterLink.THONG_KE_HUAN_LUYEN_ROUTE,
  //       icon: <DocumentTextSVG />,
  //       children: [],
  //       text: "Thống kê huấn luyện",
  //       module: SystemFeatures.ManagerTrainnings,
  //       action: [SystemAction.View, SystemAction.Edit],
  //     },
  //     {
  //       url: RouterLink.RUT_KINH_NGHIEM_ROUTE,
  //       key: RouterLink.RUT_KINH_NGHIEM_ROUTE,
  //       icon: <DocumentTextSVG />,
  //       children: [],
  //       text: "Rút kinh nghiệm huấn luyện",
  //       module: SystemFeatures.ManagerExperiences,
  //       action: [SystemAction.View, SystemAction.Edit],
  //     },
  //     {
  //       url: RouterLink.SO_GIAO_BAN_ROUTE.replace(
  //         ":type",
  //         typeMeetingBook.TRUNG_TAM
  //       ),
  //       key: RouterLink.SO_GIAO_BAN_ROUTE.replace(
  //         ":type",
  //         typeMeetingBook.TRUNG_TAM
  //       ),
  //       icon: <DocumentTextSVG />,
  //       children: [],
  //       text: "Sổ giao ban trung tâm",
  //     },
  //     {
  //       url: RouterLink.SO_GIAO_BAN_ROUTE.replace(":type", typeMeetingBook.CUM),
  //       key: RouterLink.SO_GIAO_BAN_ROUTE.replace(":type", typeMeetingBook.CUM),
  //       icon: <DocumentTextSVG />,
  //       children: [],
  //       text: "Sổ giao ban cụm",
  //     },
  //     {
  //       url: RouterLink.SO_GIAO_BAN_ROUTE.replace(":type", typeMeetingBook.DOI),
  //       key: RouterLink.SO_GIAO_BAN_ROUTE.replace(":type", typeMeetingBook.DOI),
  //       icon: <DocumentTextSVG />,
  //       children: [],
  //       text: "Sổ giao ban đội",
  //     },
  //   ],
  // },
  // {
  //   url: RouterLink.GUARD_MENU,
  //   key: RouterLink.GUARD_MENU,
  //   icon: <NotebookSVG />,
  //   text: "Sổ theo dõi và thống kê",
  //   module: SystemFeatures.ManagerTrackWork,
  //   action: [SystemAction.View, SystemAction.Edit],
  //   children: [
  //     {
  //       url: RouterLink.SO_THEO_DOI_DI_CONG_TAC,
  //       key: RouterLink.SO_THEO_DOI_DI_CONG_TAC,
  //       icon: <NotebookSVG />,
  //       children: [],
  //       text: "Sổ theo dõi đi công tác",
  //     },
  //     {
  //       url: RouterLink.SO_THEO_DOI_KY_LUAT,
  //       key: RouterLink.SO_THEO_DOI_KY_LUAT,
  //       icon: <NotebookSVG />,
  //       children: [],
  //       text: "Sổ theo dõi quản lý kỷ luật",
  //     },
  //     {
  //       url: RouterLink.SO_THONG_KE_TAI_LIEU,
  //       key: RouterLink.SO_THONG_KE_TAI_LIEU,
  //       icon: <NotebookSVG />,
  //       children: [],
  //       text: "Sổ thống kê tài liệu",
  //     },
  //     {
  //       url: RouterLink.SO_THONG_KE_RA_VAO,
  //       key: RouterLink.SO_THONG_KE_RA_VAO,
  //       icon: <NotebookSVG />,
  //       children: [],
  //       text: "Sổ thống kê vào ra",
  //     },
  //     {
  //       url: RouterLink.SO_DIEN_DEN,
  //       key: RouterLink.SO_DIEN_DEN,
  //       icon: <NotebookSVG />,
  //       children: [],
  //       text: "Sổ điện đến",
  //     },
  //     {
  //       url: RouterLink.SO_DIEN_DI,
  //       key: RouterLink.SO_DIEN_DI,
  //       icon: <NotebookSVG />,
  //       children: [],
  //       text: "Sổ điện đi",
  //     },
  //   ],
  // },
  //
  // {
  //   url: RouterLink.GUARD_MENU,
  //   key: RouterLink.GUARD_MENU,
  //   icon: <NotebookSVG />,
  //   text: "Sổ sách cá nhân",
  //   module: SystemFeatures.ManagerPersonalDiarys,
  //   action: [SystemAction.View, SystemAction.Edit],
  //   children: [
  //     {
  //       url: RouterLink.THONG_KE_HUAN_LUYEN_CA_NHAN,
  //       key: RouterLink.THONG_KE_HUAN_LUYEN_CA_NHAN,
  //       icon: <NotebookSVG />,
  //       children: [],
  //       text: "Sổ học tập chuyên ngành",
  //       module: SystemFeatures.ManagerPersonalDiarys,
  //       action: [SystemAction.View, SystemAction.Edit],
  //     },
  //   ],
  // },
  // {
  //   url: RouterLink.GUARD_MENU,
  //   key: RouterLink.GUARD_MENU,
  //   icon: <OilSVG />,
  //   text: "Quản lý xăng dầu",
  //   module: SystemFeatures.ManagerFuel,
  //   action: [SystemAction.View, SystemAction.Edit],
  //   children: [
  //     {
  //       url: RouterLink.QUAN_LY_XE_ROUTE,
  //       key: RouterLink.QUAN_LY_XE_ROUTE,
  //       icon: <CarSVG />,
  //       children: [
  //         {
  //           url: RouterLink.QUAN_LY_XE_ROUTE,
  //           key: RouterLink.QUAN_LY_XE_ROUTE,
  //           icon: null,
  //           children: [],
  //           text: "Danh mục xe",
  //         },
  //         {
  //           url: RouterLink.QUAN_LY_NHIEN_LIEU_ROUTE,
  //           key: RouterLink.QUAN_LY_NHIEN_LIEU_ROUTE,
  //           icon: null,
  //           children: [],
  //           text: "Danh mục nhiên liệu",
  //         },
  //         {
  //           url: RouterLink.QUAN_LY_NHIEM_VU_ROUTE,
  //           key: RouterLink.QUAN_LY_NHIEM_VU_ROUTE,
  //           icon: null,
  //           children: [],
  //           text: "Danh mục nhiệm vụ",
  //         },
  //         {
  //           url: RouterLink.QUAN_LY_DAU_MOI_ROUTE,
  //           key: RouterLink.QUAN_LY_DAU_MOI_ROUTE,
  //           icon: null,
  //           children: [],
  //           text: "Danh mục đầu mối",
  //         },
  //       ],
  //       text: "Quản lý danh mục",
  //       // module: SystemFeatures.ManagerPersonalDiarys,
  //       // action: [SystemAction.View, SystemAction.Edit],
  //     },
  //     {
  //       url: RouterLink.QUAN_LY_TONG_HOP_XE_ROUTE,
  //       key: RouterLink.QUAN_LY_TONG_HOP_XE_ROUTE,
  //       icon: <CarSVG />,
  //       children: [
  //         {
  //           url: RouterLink.QUAN_LY_TONG_HOP_XE_ROUTE,
  //           key: RouterLink.QUAN_LY_TONG_HOP_XE_ROUTE,
  //           icon: null,
  //           children: [],
  //           text: "Đăng kí xe",
  //         },
  //         {
  //           url: RouterLink.QUAN_LY_KE_HOACH_XE_ROUTE,
  //           key: RouterLink.QUAN_LY_KE_HOACH_XE_ROUTE,
  //           icon: null,
  //           children: [],
  //           text: "Kế hoạch xe",
  //           // module: SystemFeatures.ManagerPersonalDiarys,
  //           // action: [SystemAction.View, SystemAction.Edit],
  //         },
  //         {
  //           url: RouterLink.QUAN_LY_LENH_XE_ROUTE,
  //           key: RouterLink.QUAN_LY_LENH_XE_ROUTE,
  //           icon: null,
  //           children: [],
  //           text: "Lệnh điều phương tiện",
  //           // module: SystemFeatures.ManagerPersonalDiarys,
  //           // action: [SystemAction.View, SystemAction.Edit],
  //         },
  //         {
  //           url: RouterLink.QUAN_LY_PHIEU_XUAT_XANG_ROUTE,
  //           key: RouterLink.QUAN_LY_PHIEU_XUAT_XANG_ROUTE,
  //           icon: null,
  //           children: [],
  //           text: "Phiếu xuất xăng dầu",
  //           // module: SystemFeatures.ManagerPersonalDiarys,
  //           // action: [SystemAction.View, SystemAction.Edit],
  //         },
  //       ],
  //       text: "Quản lý nhập/xuất",
  //     },
  //   ],
  // },
  // {
  //   url: RouterLink.QUAN_TRI_NGUOI_DUNG_ROUTE,
  //   key: RouterLink.QUAN_TRI_NGUOI_DUNG_ROUTE,
  //   icon: <AdminSVG />,
  //   text: "Quản trị",
  //   children: [
  //     {
  //       url: RouterLink.QUAN_TRI_NGUOI_DUNG_ROUTE,
  //       key: RouterLink.QUAN_TRI_NGUOI_DUNG_ROUTE,
  //       icon: <UserSVG />,
  //       children: [],
  //       text: "Người dùng",
  //       module: SystemFeatures.ManagerUsers,
  //       action: [SystemAction.View, SystemAction.Edit],
  //     },
  //     {
  //       url: RouterLink.QUAN_TRI_PERMISSION_ROUTE,
  //       key: RouterLink.QUAN_TRI_PERMISSION_ROUTE,
  //       icon: <FaWrench />,
  //       children: [],
  //       text: "Quyền",
  //       module: SystemFeatures.ManagerPermission,
  //       action: [SystemAction.View, SystemAction.Edit],
  //     },
  //     {
  //       url: RouterLink.QUAN_TRI_CHUC_DANH_ROUTE,
  //       key: RouterLink.QUAN_TRI_CHUC_DANH_ROUTE,
  //       icon: <FaWrench />,
  //       children: [],
  //       text: "Chức vụ",
  //       module: SystemFeatures.ManagerPositions,
  //       action: [SystemAction.View, SystemAction.Edit],
  //     },
  //     {
  //       url: RouterLink.QUAN_TRI_ROLE_ROUTE,
  //       key: RouterLink.QUAN_TRI_ROLE_ROUTE,
  //       icon: <FaWrench />,
  //       children: [],
  //       text: "Vai trò",
  //       module: SystemFeatures.ManagerRoles,
  //       action: [SystemAction.View, SystemAction.Edit],
  //     },
  //     {
  //       url: RouterLink.QUAN_TRI_DON_VI_ROUTE,
  //       key: RouterLink.QUAN_TRI_DON_VI_ROUTE,
  //       icon: <FaWrench />,
  //       children: [],
  //       text: "Đơn vị",
  //       module: SystemFeatures.ManagerUnits,
  //       action: [SystemAction.View, SystemAction.Edit],
  //     },
  //   ],
  // },

  // {
  //   url: RouterLink.CONTACT,
  //   key: RouterLink.CONTACT,
  //   icon: <FaPhone />,
  //   children: [],
  //   text: "Liên hệ",
  // },
  {
    url: RouterLink.TRAINING,
    key: RouterLink.TRAINING,
    icon: <IoIosSchool />, // Icon giáo dục, phù hợp với huấn luyện
    text: "Công tác tham mưu huấn luyện",
    children: [
      {
        url: RouterLink.PLAN,
        key: RouterLink.PLAN,
        icon: <IoIosCalendar />, // Icon lịch trình
        text: "Kế hoạch, tiến trình biểu",
        children: [
          {
            url: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "01"),
            key: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "01"),
            icon: <IoIosCalendar />,
            text: "KHHLCĐ năm",
            children: [],
          },
          {
            url: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "02"),
            key: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "02"),
            icon: <IoIosCalendar />,
            text: "KHHLCĐ giai đoạn 1",
            children: [],
          },
          {
            url: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "03"),
            key: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "03"),
            icon: <IoIosCalendar />,
            text: "KHHLCĐ giai đoạn 2",
            children: [],
          },
          {
            url: RouterLink.PLAN_MONTH,
            key: RouterLink.PLAN_MONTH,
            icon: <IoIosCalendar />,
            text: "KHHLCĐ tháng",
            children: [],
          },
          {
            url: RouterLink.TIEN_TRINH_BIEU_ROUTE,
            key: RouterLink.TIEN_TRINH_BIEU_ROUTE,
            icon: <IoIosCalendar />,
            text: "TTB HLCĐ tuần",
            children: [],
          },
        ],
      },
      {
        url: RouterLink.ORDER,
        key: RouterLink.ORDER,
        icon: <IoIosPaper />, // Icon tài liệu, phù hợp với mệnh lệnh
        text: "Mệnh lệnh, HD",
        children: [
          {
            url: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "04"),
            key: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "04"),
            icon: <IoIosPaper />,
            text: "ML HLCĐ năm",
            children: [],
          },
          {
            url: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "05"),
            key: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "05"),
            icon: <IoIosPaper />,
            text: "HD thực hiện KHHLCĐ năm",
            children: [],
          },
          {
            url: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "05"),
            key: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "05"),
            icon: <IoIosPaper />,
            text: "HD thực hiện KHHLCĐ GD1",
            children: [],
          },
          {
            url: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "06"),
            key: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "06"),
            icon: <IoIosPaper />,
            text: "HD thực hiện KHHLCĐ GD2",
            children: [],
          },
        ],
      },
      {
        url: RouterLink.STATS,
        key: RouterLink.STATS,
        icon: <IoIosStats />, // Icon thống kê
        text: "Thống kê huấn luyện",
        children: [],
      },
      {
        url: RouterLink.REPORTS,
        key: RouterLink.REPORTS,
        icon: <IoIosClipboard />, // Icon báo cáo
        text: "Báo cáo huấn luyện",
        children: [
          {
            url: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "08"),
            key: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "08"),
            icon: <IoIosClipboard />,
            text: "Báo cáo HL tuần",
            children: [],
          },
          {
            url: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "09"),
            key: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "09"),
            icon: <IoIosClipboard />,
            text: "Báo cáo HL tháng",
            children: [],
          },
          {
            url: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "10"),
            key: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "10"),
            icon: <IoIosClipboard />,
            text: "Báo cáo HL quý",
            children: [],
          },
          {
            url: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "11"),
            key: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "11"),
            icon: <IoIosClipboard />,
            text: "Báo cáo HL 6 tháng",
            children: [],
          },
          {
            url: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "12"),
            key: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "12"),
            icon: <IoIosClipboard />,
            text: "Báo cáo HL 9 tháng",
            children: [],
          },
          {
            url: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "13"),
            key: RouterLink.UPLOAD_TAI_LIEU.replace(":type", "13"),
            icon: <IoIosClipboard />,
            text: "Báo cáo HL năm",
            children: [],
          },
        ],
      },
      {
        url: RouterLink.DOCS,
        key: RouterLink.DOCS,
        icon: <IoIosBook />, // Icon giáo trình
        text: "Giáo án, thông qua giáo án",
        children: [
          {
            url: RouterLink.DOCS_APPROVE,
            key: RouterLink.DOCS_APPROVE,
            icon: <IoIosCheckmark />,
            text: "Thông qua giáo án",
            children: [],
          },
          {
            url: RouterLink.DOCS_TRAIN,
            key: RouterLink.DOCS_TRAIN,
            icon: <IoIosBook />,
            text: "Giáo án huấn luyện",
            children: [],
          },
        ],
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
        url: RouterLink.THONG_KE_HUAN_LUYEN_CA_NHAN,
        key: RouterLink.THONG_KE_HUAN_LUYEN_CA_NHAN,
        icon: <IoIosJournal />, // Icon sổ ghi chép
        text: "Sổ học tập cá nhân",
        children: [],
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
];
