import { SystemAction, SystemFeatures } from ".";

export type Permission = {
  module: SystemFeatures;
  action: SystemAction;
};
