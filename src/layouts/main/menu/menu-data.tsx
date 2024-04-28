import { RouterLink } from "../../../routers/routers";
import { SideMenuItem } from "../../../types";

import { FaBeer, FaCalendar, FaCheck, FaHome, FaPhone } from "react-icons/fa";

export const mainMenu: Array<SideMenuItem> = [
  {
    url: RouterLink.HOME,
    key: RouterLink.HOME,
    icon: <FaHome />,
    children: [],
    text: "Trang chủ",
  },
  {
    url: RouterLink.TROOP_REPORT,
    key: RouterLink.TROOP_REPORT,
    icon: <FaHome />,
    children: [],
    text: "Báo quân số",
  },
  {
    url: RouterLink.LEAVE_MENU,
    key: RouterLink.LEAVE_MENU,
    icon: <FaCalendar />,
    text: "Nghỉ phép",
    children: [
      {
        url: RouterLink.LEAVE_REGISTER,
        key: RouterLink.LEAVE_REGISTER,
        icon: <FaBeer />,
        children: [],
        text: "Đăng ký nghỉ phép",
      },
      {
        url: RouterLink.LEAVE_APPROVE,
        key: RouterLink.LEAVE_APPROVE,
        icon: <FaCheck />,
        children: [],
        text: "Phê duyệt nghỉ phép",
      },
    ],
  },
  {
    url: RouterLink.GUARD_MENU,
    key: RouterLink.GUARD_MENU,
    icon: <FaCalendar />,
    text: "Lịch trực",
    children: [
      {
        url: RouterLink.MANAGER_GUARD_SETTING,
        key: RouterLink.MANAGER_GUARD_SETTING,
        icon: <FaBeer />,
        children: [],
        text: "Quản lý vị trí trực",
      },
      {
        url: RouterLink.PERSONA_GUARD_SCHEDULE,
        key: RouterLink.PERSONA_GUARD_SCHEDULE,
        icon: <FaCheck />,
        children: [],
        text: "Lịch trực cá nhân",
      },
    ],
  },
  {
    url: RouterLink.CONTACT,
    key: RouterLink.CONTACT,
    icon: <FaPhone />,
    children: [],
    text: "Liên hệ",
  },
];
