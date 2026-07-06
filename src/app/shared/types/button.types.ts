export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'outline'
  | 'ghost';

export type ButtonSize =
  | 'sm'
  | 'md'
  | 'lg';

export type ButtonType =
  | 'button'
  | 'submit'
  | 'reset';

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
