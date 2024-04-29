import { SystemFeatures, SystemAction } from "../types";

export const MAIN_MESSAGE = process.env.REACT_APP_MESSAGE
  ? process.env.REACT_APP_MESSAGE
  : "Hello React";
export * from "./keys";
export * from "./config";

export const FEATURES_SYSTEM = [
  SystemFeatures.ManagerUsers,
  SystemFeatures.ManagerRoles,
  SystemFeatures.ManagerUnits,
  SystemFeatures.ManagerPermission,
  SystemFeatures.TroopReports,
  SystemFeatures.ManagerRegisterLeave,
  SystemFeatures.ManagerGuardDutty,
  SystemFeatures.ManagerDuttySetting,
  SystemFeatures.ManagerProgresses,
  SystemFeatures.ManagerPositions,
  SystemFeatures.ManagerProgresses,
  SystemFeatures.ManagerDocuments,
  SystemFeatures.ManagerTrainnings
];

export const ACTIONS_SYSTEM = [
  SystemAction.View,
  SystemAction.Edit,
  SystemAction.Approve,
  SystemAction.Report,
  SystemAction.UnitApprove,
];
