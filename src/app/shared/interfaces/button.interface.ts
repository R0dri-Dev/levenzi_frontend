import { ButtonSize, ButtonType, ButtonVariant } from '../types/button.types';

export interface ButtonConfig {

  variant: ButtonVariant;

  size: ButtonSize;

  type: ButtonType;

  loading?: boolean;

  disabled?: boolean;

  fullWidth?: boolean;

  iconLeft?: string;

  iconRight?: string;

}
