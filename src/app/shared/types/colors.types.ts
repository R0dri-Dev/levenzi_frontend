/**
 * ============================================================
 * LEVENZI DESIGN SYSTEM — COLOR TOKENS
 * ============================================================
 */

export type LvColorVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'tertiary'
  | 'neutral';

export interface LvColorClasses {
  bg: string;
  bgHover: string;
  bgActive: string;
  bgLight: string;
  bgLightHover: string;
  text: string;
  textOnBg: string;
  border: string;
  borderHover: string;
  ring: string;
}

export const LV_COLOR_MAP: Record<LvColorVariant, LvColorClasses> = {
  // ✅ Ahora usa nombres semánticos (coherentes con @theme)
  primary: {
    bg: 'bg-primary-600',
    bgHover: 'hover:bg-primary-700',
    bgActive: 'active:bg-primary-800',
    bgLight: 'bg-primary-50',
    bgLightHover: 'hover:bg-primary-100',
    text: 'text-primary-600',
    textOnBg: 'text-white',
    border: 'border-primary-600',
    borderHover: 'hover:border-primary-700',
    ring: 'focus:ring-primary-500',
  },
  secondary: {
    bg: 'bg-secondary-600',
    bgHover: 'hover:bg-secondary-700',
    bgActive: 'active:bg-secondary-800',
    bgLight: 'bg-secondary-50',
    bgLightHover: 'hover:bg-secondary-100',
    text: 'text-secondary-600',
    textOnBg: 'text-white',
    border: 'border-secondary-600',
    borderHover: 'hover:border-secondary-700',
    ring: 'focus:ring-secondary-500',
  },
  success: {
    bg: 'bg-success-600',
    bgHover: 'hover:bg-success-700',
    bgActive: 'active:bg-success-800',
    bgLight: 'bg-success-50',
    bgLightHover: 'hover:bg-success-100',
    text: 'text-success-600',
    textOnBg: 'text-white',
    border: 'border-success-600',
    borderHover: 'hover:border-success-700',
    ring: 'focus:ring-success-500',
  },
  danger: {
    bg: 'bg-danger-600',
    bgHover: 'hover:bg-danger-700',
    bgActive: 'active:bg-danger-800',
    bgLight: 'bg-danger-50',
    bgLightHover: 'hover:bg-danger-100',
    text: 'text-danger-600',
    textOnBg: 'text-white',
    border: 'border-danger-600',
    borderHover: 'hover:border-danger-700',
    ring: 'focus:ring-danger-500',
  },
  warning: {
    bg: 'bg-warning-500',  
    bgHover: 'hover:bg-warning-600',
    bgActive: 'active:bg-warning-700',
    bgLight: 'bg-warning-50',
    bgLightHover: 'hover:bg-warning-100',
    text: 'text-warning-600',
    textOnBg: 'text-white',
    border: 'border-warning-500',
    borderHover: 'hover:border-warning-600',
    ring: 'focus:ring-warning-400',
  },
  info: {
    bg: 'bg-info-600',
    bgHover: 'hover:bg-info-700',
    bgActive: 'active:bg-info-800',
    bgLight: 'bg-info-50',
    bgLightHover: 'hover:bg-info-100',
    text: 'text-info-600',
    textOnBg: 'text-white',
    border: 'border-info-600',
    borderHover: 'hover:border-info-700',
    ring: 'focus:ring-info-500',
  },
  tertiary: {
    bg: 'bg-tertiary-600',
    bgHover: 'hover:bg-tertiary-700',
    bgActive: 'active:bg-tertiary-800',
    bgLight: 'bg-tertiary-50',
    bgLightHover: 'hover:bg-tertiary-100',
    text: 'text-tertiary-600',
    textOnBg: 'text-white',
    border: 'border-tertiary-600',
    borderHover: 'hover:border-tertiary-700',
    ring: 'focus:ring-tertiary-500',
  },
  neutral: {
    bg: 'bg-neutral-600',
    bgHover: 'hover:bg-neutral-700',
    bgActive: 'active:bg-neutral-800',
    bgLight: 'bg-neutral-50',
    bgLightHover: 'hover:bg-neutral-100',
    text: 'text-neutral-600',
    textOnBg: 'text-white',
    border: 'border-neutral-600',
    borderHover: 'hover:border-neutral-700',
    ring: 'focus:ring-neutral-500',
  },
};

export const LV_COLOR_VARIANTS: LvColorVariant[] = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'tertiary',
  'neutral',
];
