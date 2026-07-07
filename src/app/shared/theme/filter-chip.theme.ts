// src/app/shared/theme/filter-chip.theme.ts
export const LV_FILTER_CHIP_BASE =
  'inline-flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed';

export const LV_FILTER_CHIP_VARIANTS = {
  primary: 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200',
  success: 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-200 ',
  danger: 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-200',
    warning: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200',
    info: 'bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200',
};

export const LV_FILTER_CHIP_SIZES = {
  sm: 'px-2.5 py-0.5 text-xs rounded-xl',
  md: 'px-3.5 py-1 text-sm rounded-xl',
  lg: 'px-4.5 py-1.5 text-base rounded-xl',
};

export const LV_FILTER_CHIP_SHAPES = {
  default: 'rounded-xl',
  pill: 'rounded-full',
  square: 'rounded-lg',
};

export const LV_FILTER_CHIP_REMOVE =
  'text-current opacity-60 hover:opacity-100 transition-opacity duration-200 ml-0.5';
