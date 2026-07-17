import { LvInputType } from "./input.types";
import { Option } from "../interfaces/option.interface";
import { Pais } from "../../core/models/pais.model";

export interface LvFormFieldConfig {
  key: string;
  type: LvInputType;
  label: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  icon?: string;
  options?: Option[];
  colSpan?: 1 | 2;
  row?: number;
  col?: number;

  // Solo aplica cuando type === 'document'
  numeroKey?: string;
  numeroLabel?: string;
  numeroPlaceholder?: string;
  paisesData?: Pais[];
  lookup?: boolean;

}
