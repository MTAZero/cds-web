import { SystemAction, SystemFeatures } from ".";

export type SideMenuItem = {
  url: string;
  key: string;
  icon: any;
  children: Array<SideMenuItem>;
  text: string;
  module?: SystemFeatures | null;
  action?: Array<SystemAction> | null;
};
