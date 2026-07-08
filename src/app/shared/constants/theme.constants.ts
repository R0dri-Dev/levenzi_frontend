import { LvColorVariant } from '../types/colors.types';

export interface LvThemeColorHex {
  50: string;
  500: string;
  600: string;
  700: string;
}

export const LV_THEME_COLORS: Record<LvColorVariant, LvThemeColorHex> = {
  primary: { 50: '#eff6ff', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8' },
  secondary: { 50: '#f9fafb', 500: '#6b7280', 600: '#4b5563', 700: '#374151' },
  success: { 50: '#ecfdf5', 500: '#10b981', 600: '#059669', 700: '#047857' },
  danger: { 50: '#fef2f2', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c' },
  warning: { 50: '#fffbeb', 500: '#f59e0b', 600: '#d97706', 700: '#b45309' },
  info: { 50: '#f0f9ff', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1' },
  neutral: { 50: '#f8fafc', 500: '#64748b', 600: '#475569', 700: '#334155' },
};

export const LV_THEME_COLOR_HEX: Record<LvColorVariant, string> = {
  primary: LV_THEME_COLORS.primary[600],
  secondary: LV_THEME_COLORS.secondary[600],
  success: LV_THEME_COLORS.success[600],
  danger: LV_THEME_COLORS.danger[600],
  warning: LV_THEME_COLORS.warning[600],
  info: LV_THEME_COLORS.info[600],
  neutral: LV_THEME_COLORS.neutral[600],
};

export const LV_CHART_PALETTE: string[] = [
  LV_THEME_COLORS.primary[600],
  LV_THEME_COLORS.success[600],
  LV_THEME_COLORS.warning[600],
  LV_THEME_COLORS.info[600],
  LV_THEME_COLORS.danger[600],
  LV_THEME_COLORS.secondary[600],
  LV_THEME_COLORS.neutral[500],
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
