export * from "./permissions.type";
export * from "./menu-items.type";
export * from "./param-search.type";
export * from "./format-time.enum";
export * from "./field-type.enum";
export * from "./catalog.enum";
export * from "./currency.enum";
export * from "./type-meeting-book.enum";
export enum SystemFeatures {
  ManagerUsers = "ManagerUsers",
  ManagerRoles = "ManagerRoles",
  ManagerUnits = "ManagerUnits",
  ManagerPermission = "ManagerPermissions",
  TroopReports = "TroopReports",
  ManagerRegisterLeave = "ManagerRegisterLeave",
  ManagerGuardDutty = "ManagerGuardDutty",
  ManagerDuttySetting = "ManagerDuttySetting",
  ManagerPositions = "ManagerPositions",
  ManagerProgresses = "ManagerProgresses",
  ManagerDocuments = "ManagerDocuments",
  ManagerTrainnings = "ManagerTrainings",
  ManagerExperiences = "ManagerExperiences",
  ManagerPersonalDiarys = "ManagerPersonalDiarys",
  WorkCalendar = "WorkCalendar",
  ManagerVehicle = "ManagerVehicle",
  RegisterVehicle = "RegisterVehicle",
  VehicleCommand = "VehicleCommand",
  DeliveryBill = "DeliveryBill",
  MeetingBook = "MeetingBook",
  ManagerFuel = "ManagerFuel",
  ManagerTask = "ManagerTask",
  ManagerWorkAddress = "ManagerWorkAddress",
  ManagerTrackDiscipline = "ManagerTrackDiscipline",
  StatisticDocument = "StatisticDocument",
  ManagerTrackWork = "ManagerTrackWork",
  AccessControl = "AccessControl",
  ViewStatisticPage = "ViewStatisticPage",
  GoingCall = "GoingCall",
  InComingCall = "InComingCall",
}

export enum SystemAction {
  View = "View",
  Edit = "Edit",
  Approve = "Approve",
  Report = "Report",
  UnitApprove = "UnitApprove",
}

export enum TroopStatus {
  CoMat = "CoMat",
  NghiPhep = "NghiPhep",
  NghiOm = "NghiOm",
  DiVien = "DiVien",
  TranhThu = "TranhThu",
  NghiCuoiTuan = "NghiCuoiTuan",
  CongTac = "CongTac",
  ChinhSach = "ChinhSach",
  DiHoc = "DiHoc",
  Khac = "Khac",
  TangCuong = "TangCuong",
}

export const selectTroopData = [
  {
    value: TroopStatus.CoMat,
    text: "Có mặt",
  },
  {
    value: TroopStatus.CongTac,
    text: "Công tác",
  },
  {
    value: TroopStatus.TangCuong,
    text: "Tăng cường",
  },
  {
    value: TroopStatus.NghiPhep,
    text: "Nghỉ phép",
  },
  {
    value: TroopStatus.TranhThu,
    text: "Tranh thủ",
  },
  {
    value: TroopStatus.NghiCuoiTuan,
    text: "Nghỉ cuối tuần",
  },
  {
    value: TroopStatus.NghiOm,
    text: "Nghỉ ốm",
  },
  {
    value: TroopStatus.DiVien,
    text: "Đi viện",
  },
  {
    value: TroopStatus.DiHoc,
    text: "Đi học",
  },
  {
    value: TroopStatus.Khac,
    text: "Khác",
  },

  // {
  //   value: TroopStatus.ChinhSach,
  //   text: "Chính sách",
  // },
];

export const getTextByStatus = (status: TroopStatus) => {
  const ans = selectTroopData.find((i) => i.value === status);
  return ans ? ans.text : "";
};
