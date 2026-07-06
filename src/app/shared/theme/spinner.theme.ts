import {
  SpinnerColor,
  SpinnerSize
} from '../types/spinner.types';

export const LV_SPINNER_BASE =
  'inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent';

export const LV_SPINNER_SIZES: Record<SpinnerSize, string> = {

  sm: 'h-4 w-4',

  md: 'h-6 w-6',

  lg: 'h-8 w-8',

  xl: 'h-12 w-12'

};

export const LV_SPINNER_COLORS: Record<SpinnerColor, string> = {

  primary: 'text-blue-600',

  secondary: 'text-gray-700',

  danger: 'text-red-600',

  success: 'text-green-600'

};
