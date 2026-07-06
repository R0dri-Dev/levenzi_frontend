// src/app/shared/types/modal.types.ts
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalVariant = 'default' | 'danger' | 'success' | 'warning' | 'info';

export interface ModalAction {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  action: () => void;
  loading?: boolean;
  disabled?: boolean;
}
