import { LvColorVariant } from "../types";

export interface ModalAction {
  label: string;
  action: () => void;
  variant?: LvColorVariant;
  disabled?: boolean;
  loading?: boolean;
}
