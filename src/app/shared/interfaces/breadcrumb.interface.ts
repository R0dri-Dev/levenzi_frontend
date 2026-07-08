import { IconKeys } from "../core/icons";

export interface BreadcrumbItem {
  label: string;
  path?: string;
  active?: boolean;
  icon?: IconKeys;
}
