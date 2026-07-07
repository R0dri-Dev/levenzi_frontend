// shared/theme/form-error.theme.ts
import type { FormErrorVariant, FormErrorSize } from '../types/form-error.types';

export const LV_FORM_ERROR_BASE =
  'flex items-start gap-2 rounded-xl px-4 py-3 text-sm transition-all duration-200';

export const LV_FORM_ERROR_VARIANTS: Record<FormErrorVariant, string> = {
  error: 'border border-red-200 bg-red-50 text-red-700',  
  warning: 'border border-amber-200 bg-amber-50 text-amber-700',
  info: 'border border-blue-200 bg-blue-50 text-blue-700',
  success: 'border border-green-200 bg-green-50 text-green-700',
};

export const LV_FORM_ERROR_SIZES: Record<FormErrorSize, string> = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-3 text-sm',
  lg: 'px-5 py-4 text-base',
};

export const LV_FORM_ERROR_ICON_CLASS = 'mt-0.5 shrink-0';
