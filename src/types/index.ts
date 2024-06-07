export * from "./permissions.type";
export * from "./menu-items.type";
export * from "./param-search.type";
export * from "./format-time.enum";
export * from "./field-type.enum";
export * from "./catalog.enum";
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
}

export const selectTroopData = [
  {
    value: TroopStatus.CoMat,
    text: "Có mặt",
  },
  {
    value: TroopStatus.NghiPhep,
    text: "Nghỉ phép",
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
    value: TroopStatus.TranhThu,
    text: "Tranh thủ",
  },
  {
    value: TroopStatus.NghiCuoiTuan,
    text: "Nghỉ cuối tuần",
  },
  {
    value: TroopStatus.CongTac,
    text: "Công tác",
  },
  {
    value: TroopStatus.ChinhSach,
    text: "Chính sách",
  },
  {
    value: TroopStatus.DiHoc,
    text: "Đi học",
  },
  {
    value: TroopStatus.Khac,
    text: "Khác",
  },
];

export const getTextByStatus = (status: TroopStatus) => {
  const ans = selectTroopData.find((i) => i.value === status);
  return ans ? ans.text : "";
};
