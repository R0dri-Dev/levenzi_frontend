import { LvInputType } from "./input.types";

export interface LvFieldOption {
  label: string;
  value: string | number;
}

export interface LvFormFieldConfig {
  key: string;
  type: LvInputType;
  label: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  icon?: string;
  options?: LvFieldOption[];
  colSpan?: 1 | 2;
  row?: number;
  col?: number;
}

