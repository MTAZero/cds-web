import {SystemAction, SystemFeatures, fieldType} from "types";
import {randomId} from "utils";

const {INPUT, COMBO_BOX} = fieldType;
const css = {xs: 24, sm: 24, md: 24, lg: 24, xl: 24};
const fields = [
  {key: "_id", name: "_id", type: INPUT, hide: true},
  {
    key: "role",
    name: "role",
    type: COMBO_BOX,
    label: "Role",
    css: css,
    rules: [{required: true, message: "Bắt buộc chọn role"}],
  },
  {
    key: "module",
    name: "module",
    type: COMBO_BOX,
    label: "Module",
    options: Object.values(SystemFeatures)?.map(e => ({
      label: e,
      value: e,
      key: randomId(),
    })),
    rules: [{required: true, message: "Bắt buộc chọn module"}],
    css: css,
  },
  {
    key: "action",
    name: "action",
    type: COMBO_BOX,
    label: "Action",
    options: [
      {value: SystemAction.View, label: SystemAction.View},
      {value: SystemAction.Edit, label: SystemAction.Edit},
      {value: SystemAction.Approve, label: SystemAction.Approve},
      {value: SystemAction.Report, label: SystemAction.Report},
      {value: SystemAction.UnitApprove, label: SystemAction.UnitApprove},
    ],
    rules: [{required: true, message: "Bắt buộc chọn action"}],
    css: css,
  },
];
export {fields};
// {
//         value: SystemFeatures.ManagerUsers,
//         label: SystemFeatures.ManagerUsers,
//       },
//       {
//         value: SystemFeatures.ManagerRoles,
//         label: SystemFeatures.ManagerRoles,
//       },
//       {
//         value: SystemFeatures.ManagerUnits,
//         label: SystemFeatures.ManagerUnits,
//       },
//       {
//         value: SystemFeatures.ManagerPermission,
//         label: SystemFeatures.ManagerPermission,
//       },
//       {
//         value: SystemFeatures.TroopReports,
//         label: SystemFeatures.TroopReports,
//       },
//       {
//         value: SystemFeatures.ManagerRegisterLeave,
//         label: SystemFeatures.ManagerRegisterLeave,
//       },
//       {
//         value: SystemFeatures.ManagerGuardDutty,
//         label: SystemFeatures.ManagerGuardDutty,
//       },
//       {
//         value: SystemFeatures.ManagerDuttySetting,
//         label: SystemFeatures.ManagerDuttySetting,
//       },
//       {
//         value: SystemFeatures.ManagerPositions,
//         label: SystemFeatures.ManagerPositions,
//       },

//       {
//         value: SystemFeatures.ManagerProgresses,
//         label: SystemFeatures.ManagerProgresses,
//       },
//       {
//         value: SystemFeatures.ManagerDocuments,
//         label: SystemFeatures.ManagerDocuments,
//       },
//       {
//         value: SystemFeatures.ManagerTrainnings,
//         label: SystemFeatures.ManagerTrainnings,
//       },
//       {
//         value: SystemFeatures.ManagerExperiences,
//         label: SystemFeatures.ManagerExperiences,
//       },
//       {
//         value: SystemFeatures.ManagerPersonalDiarys,
//         label: SystemFeatures.ManagerPersonalDiarys,
//       },
