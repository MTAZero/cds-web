export * from "./permissions.type";
export * from "./menu-items.type";

export enum SystemFeatures {
    ManagerUsers = 'ManagerUsers',
    ManagerRoles = 'ManagerRoles',
    ManagerUnits = 'ManagerUnits',
    ManagerPermission = 'ManagerPermissions',
    TroopReports = 'TroopReports',
    ManagerRegisterLeave = 'ManagerRegisterLeave',
    ManagerGuardDutty = 'ManagerGuardDutty',
    ManagerDuttySetting = 'ManagerDuttySetting',
    ManagerPositions = 'ManagerPositions',
    ManagerProgresses = 'ManagerProgresses',
    ManagerDocuments = 'ManagerDocuments',
    ManagerTrainnings = 'ManagerTrainings'
  }
  
  export enum SystemAction {
    View = 'View',
    Edit = 'Edit',
    Approve = 'Approve',
    Report = 'Report',
    UnitApprove = 'UnitApprove',
  }
