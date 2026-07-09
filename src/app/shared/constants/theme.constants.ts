import { LvColorVariant } from '../types/colors.types';

export interface LvThemeColorHex {
  50: string;
  500: string;
  600: string;
  700: string;
}

export const LV_THEME_COLORS: Record<LvColorVariant, LvThemeColorHex> = {
  primary: { 50: '#f5f3ff', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9' }, // violeta
  secondary: { 50: '#fafaf9', 500: '#78716c', 600: '#57534e', 700: '#44403c' }, // stone (gris cálido)
  success: { 50: '#ecfdf5', 500: '#10b981', 600: '#059669', 700: '#047857' }, // esmeralda
  danger: { 50: '#fff1f2', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c' }, // rose
  warning: { 50: '#fffbeb', 500: '#f59e0b', 600: '#d97706', 700: '#b45309' }, // ámbar
  info: { 50: '#ecfeff', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490' }, // cyan
  neutral: { 50: '#f8fafc', 500: '#64748b', 600: '#475569', 700: '#334155' }, // slate (sin cambios, es de UI/chrome)
  tertiary: { 50: '#fff7ed', 500: '#f97316', 600: '#ea580c', 700: '#c2410c' }, // naranja
};

export const LV_THEME_COLOR_HEX: Record<LvColorVariant, string> = {
  primary: LV_THEME_COLORS.primary[600],
  secondary: LV_THEME_COLORS.secondary[600],
  success: LV_THEME_COLORS.success[600],
  danger: LV_THEME_COLORS.danger[600],
  warning: LV_THEME_COLORS.warning[600],
  info: LV_THEME_COLORS.info[600],
  neutral: LV_THEME_COLORS.neutral[600],
  tertiary: LV_THEME_COLORS.tertiary[600],
};

// Paleta para gráficos: ahora con variedad real de matices (antes primary+info eran casi el mismo azul)
export const LV_CHART_PALETTE: string[] = [
  LV_THEME_COLORS.primary[600],   // violeta
  LV_THEME_COLORS.tertiary[600],  // naranja
  LV_THEME_COLORS.success[600],   // esmeralda
  LV_THEME_COLORS.danger[600],    // rose
  LV_THEME_COLORS.info[600],      // cyan
  LV_THEME_COLORS.warning[600],   // ámbar
  LV_THEME_COLORS.secondary[600], // stone
  LV_THEME_COLORS.neutral[500],   // slate
];

export const LV_THEME_GRAYSCALE = {
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  black: '#000000',
} as const;
