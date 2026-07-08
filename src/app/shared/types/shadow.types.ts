/**
 * ============================================================
 * LEVENZI DESIGN SYSTEM — SHADOW TOKENS
 * ============================================================
 * Escala de sombras para cards, dropdowns, modals, popovers.
 * ============================================================
 */

export type LvShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';

export const LV_SHADOW_CLASS_MAP: Record<LvShadow, string> = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  inner: 'shadow-inner',
};

/** Sombra al hacer hover, útil en cards clickeables o botones elevados */
export const LV_SHADOW_HOVER_CLASS_MAP: Record<LvShadow, string> = {
  none: 'hover:shadow-none',
  sm: 'hover:shadow-md',
  md: 'hover:shadow-lg',
  lg: 'hover:shadow-xl',
  xl: 'hover:shadow-2xl',
  '2xl': 'hover:shadow-2xl',
  inner: 'hover:shadow-inner',
};

/** Uso recomendado por tipo de componente (referencia, no se importa) */
export const LV_SHADOW_USAGE: Record<string, LvShadow> = {
  card: 'sm',
  cardHover: 'md',
  dropdown: 'lg',
  modal: 'xl',
  toast: 'lg',
  popover: 'md',
};

export const LV_SHADOWS: LvShadow[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'inner'];
