// shared/theme/input.theme.ts
import type { InputVariant, InputSize } from '../types/input.types';

export const LV_INPUT_BASE =
  'w-full rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60';

export const LV_INPUT_SIZES: Record<InputSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
};

export const LV_INPUT_VARIANTS: Record<InputVariant, string> = {
  primary: 'border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-200',
  secondary: 'border border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-200',
  outline: 'border-2 border-gray-300 bg-transparent text-gray-900 focus:border-blue-500 focus:ring-blue-200',
  ghost: 'border-0 bg-transparent text-gray-900 focus:ring-blue-200',
  danger: 'border border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-200',
  success: 'border border-green-300 bg-green-50 text-green-900 focus:border-green-500 focus:ring-green-200',
};




export const LV_INPUT_ICON =
  'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none';

