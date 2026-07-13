import { LvColorVariant } from '../types/colors.types';

export interface LvThemeColorHex {
  50: string;
  500: string;
  600: string;
  700: string;
}

export const LV_THEME_COLORS: Record<LvColorVariant, LvThemeColorHex> = {
  // PRIMARY - Azul marino del wordmark, aclarado (nada de negro/tinta pesada)
  primary: { 50: '#eef1fb', 500: '#5b6fb8', 600: '#425390', 700: '#33406f' }, // navy claro

  // SECONDARY - Dorado/beige del ícono romboidal del logo
  secondary: { 50: '#fdfaf3', 500: '#c9a96b', 600: '#b0894a', 700: '#8f6e3a' }, // gold/beige

  // SUCCESS - Verde esmeralda, más claro
  success: { 50: '#f0fdf7', 500: '#3ecf8e', 600: '#22b37a', 700: '#189263' },

  // DANGER - Rose/coral, suavizado
  danger: { 50: '#fff2f3', 500: '#fb7185', 600: '#ef4b64', 700: '#d63354' },

  // WARNING - Ámbar cálido, más claro
  warning: { 50: '#fffaeb', 500: '#fbbf24', 600: '#f0a11a', 700: '#c9820f' },

  // INFO - Cyan/teal claro, distinto de primary
  info: { 50: '#f0fdfe', 500: '#38d4e8', 600: '#1cb6cc', 700: '#1596a8' },

  // NEUTRAL - Slate claro (UI/chrome, no de marca)
  neutral: { 50: '#f8fafc', 500: '#94a3b8', 600: '#64748b', 700: '#475569' },

  // TERTIARY - Coral/durazno suave, complementa el dorado sin chocar con danger
  tertiary: { 50: '#fff6ee', 500: '#ff9d6b', 600: '#f47f42', 700: '#d6642b' },

  // WHITE - variante blanca para texto/contenido sobre fondos oscuros o de color
  white: { 50: '#ffffff', 500: '#ffffff', 600: '#ffffff', 700: '#f1f5f9' },
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
  white: LV_THEME_COLORS.white[600],
};

// Paleta para gráficos: variedad clara alineada al logo (navy + gold como ejes principales)
export const LV_CHART_PALETTE: string[] = [
  LV_THEME_COLORS.primary[500],   // navy claro
  LV_THEME_COLORS.secondary[500], // gold/beige
  LV_THEME_COLORS.tertiary[500],  // coral
  LV_THEME_COLORS.success[500],   // esmeralda
  LV_THEME_COLORS.info[500],      // cyan
  LV_THEME_COLORS.danger[500],    // rose
  LV_THEME_COLORS.warning[500],   // ámbar
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
