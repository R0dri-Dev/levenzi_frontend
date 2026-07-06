import { SelectSize, SelectVariant } from "../types/select.types";

export const LV_SELECT_BASE =
  'w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60';

export const LV_SELECT_SIZES: Record<SelectSize, string> = {
  sm: 'h-9 text-sm',
  md: 'h-10 text-sm',
  lg: 'h-12 text-base',
};

export const LV_SELECT_VARIANTS: Record<SelectVariant, string> = {
  primary: '',
  outline: 'border-gray-300 bg-white',
  ghost: 'border-transparent bg-transparent',
  danger: 'border-red-500 focus:border-red-500 focus:ring-red-300',
};

