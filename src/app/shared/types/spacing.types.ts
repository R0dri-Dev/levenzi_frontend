/**
 * ============================================================
 * LEVENZI DESIGN SYSTEM — SPACING TOKENS
 * ============================================================
 * Escala de espaciado para gap, padding y margin.
 * Basada en la escala nativa de Tailwind (múltiplos de 0.25rem).
 * ============================================================
 */

export type LvSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

/** Valor real en rem, útil si necesitas calcular algo en TS (charts, canvas, etc.) */
export const LV_SPACING_REM_MAP: Record<LvSpacing, string> = {
  none: '0rem',
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
};

export const LV_GAP_CLASS_MAP: Record<LvSpacing, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
  '3xl': 'gap-16',
};

export const LV_PADDING_CLASS_MAP: Record<LvSpacing, string> = {
  none: 'p-0',
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
  '2xl': 'p-12',
  '3xl': 'p-16',
};

export const LV_MARGIN_CLASS_MAP: Record<LvSpacing, string> = {
  none: 'm-0',
  xs: 'm-1',
  sm: 'm-2',
  md: 'm-4',
  lg: 'm-6',
  xl: 'm-8',
  '2xl': 'm-12',
  '3xl': 'm-16',
};

/** Espaciado vertical entre secciones grandes (cards, forms, dashboards) */
export const LV_SPACE_Y_CLASS_MAP: Record<LvSpacing, string> = {
  none: 'space-y-0',
  xs: 'space-y-1',
  sm: 'space-y-2',
  md: 'space-y-4',
  lg: 'space-y-6',
  xl: 'space-y-8',
  '2xl': 'space-y-12',
  '3xl': 'space-y-16',
};

export const LV_SPACINGS: LvSpacing[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
