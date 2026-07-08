/**
 * ============================================================
 * LEVENZI DESIGN SYSTEM — RADIUS TOKENS
 * ============================================================
 * Escala de border-radius para botones, inputs, cards, badges.
 * ============================================================
 */

export type LvRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export const LV_RADIUS_CLASS_MAP: Record<LvRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

/** Radio por defecto recomendado por tipo de componente */
export const LV_RADIUS_USAGE: Record<string, LvRadius> = {
  button: 'lg',
  input: 'lg',
  card: 'xl',
  badge: 'full',
  avatar: 'full',
  modal: '2xl',
  toast: 'lg',
};

export const LV_RADII: LvRadius[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];

/** Radio por defecto que deben usar los componentes lv-* si no se especifica @Input() */
export const LV_DEFAULT_RADIUS: LvRadius = 'lg';
