export interface Option<T = string | number> {
  label: string;
  value: T;
  disabled?: boolean;
}
