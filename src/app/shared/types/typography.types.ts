/**
 * ============================================================
 * LEVENZI DESIGN SYSTEM — TYPOGRAPHY TOKENS
 * ============================================================
 */

export type LvFontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export const LV_FONT_SIZE_CLASS_MAP: Record<LvFontSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
};

export type LvFontWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export const LV_FONT_WEIGHT_CLASS_MAP: Record<LvFontWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

/** Roles tipográficos semánticos, para no repetir combinaciones size+weight en cada componente */
export type LvTextRole =
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'label';

export const LV_TEXT_ROLE_CLASS_MAP: Record<LvTextRole, string> = {
  'heading-1': 'text-3xl font-bold text-gray-900',
  'heading-2': 'text-2xl font-semibold text-gray-900',
  'heading-3': 'text-lg font-semibold text-gray-900',
  body: 'text-base font-normal text-gray-700',
  'body-sm': 'text-sm font-normal text-gray-600',
  caption: 'text-xs font-normal text-gray-500',
  label: 'text-sm font-medium text-gray-700',
};
