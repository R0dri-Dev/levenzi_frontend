import type { CheckboxSize, CheckboxVariant } from '../types/checkbox.types';

export const LV_CHECKBOX_BASE =
  'inline-flex items-center justify-center gap-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60';

export const LV_CHECKBOX_SIZES: Record<CheckboxSize, string> = {
  sm: 'h-4 w-4 text-sm',
  md: 'h-5 w-5 text-base',
  lg: 'h-6 w-6 text-lg',
};

export const LV_CHECKBOX_VARIANTS: Record<CheckboxVariant, string> = {
  primary: 'bg-blue-600 border-blue-600 text-white focus:ring-blue-300',
  outline: 'bg-white border border-gray-300 text-gray-700 focus:ring-gray-300',
};

