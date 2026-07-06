import { ChipSize, ChipVariant } from '../types/chip.types';

export const LV_CHIP_BASE =
  'inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200 select-none';

export const LV_CHIP_SIZES: Record<ChipSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

export const LV_CHIP_VARIANTS: Record<ChipVariant, string> = {
  primary: 'bg-blue-100 text-blue-700',
  secondary: 'bg-gray-100 text-gray-700',
  success: 'bg-green-100 text-green-700',
  danger: 'bg-red-100 text-red-700',
  warning: 'bg-yellow-100 text-yellow-700',
  outline: 'border border-gray-300 bg-white text-gray-700',
};
