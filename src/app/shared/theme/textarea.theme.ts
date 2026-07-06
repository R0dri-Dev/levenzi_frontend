import { TextareaSize, TextareaVariant } from "../types/textarea.types";

export const LV_TEXTAREA_BASE =
  'w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60';

export const LV_TEXTAREA_SIZES: Record<TextareaSize, string> = {
  sm: 'h-24 text-sm',
  md: 'h-28 text-sm',
  lg: 'h-32 text-base',
};

export const LV_TEXTAREA_VARIANTS: Record<TextareaVariant, string> = {
  primary: '',
  outline: 'border-gray-300 bg-white',
  ghost: 'border-transparent bg-transparent',
  danger: 'border-red-500 focus:border-red-500 focus:ring-red-300',
};

