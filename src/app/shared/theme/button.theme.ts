import { ButtonSize, ButtonVariant } from '../types/button.types';

export const LV_BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60';

export const LV_BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base'
};

export const LV_BUTTON_VARIANTS: Record<ButtonVariant, string> = {

  primary:
    'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-300',

  secondary:
    'bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-300',

  success:
    'bg-green-600 hover:bg-green-700 text-white focus:ring-green-300',

  danger:
    'bg-red-600 hover:bg-red-700 text-white focus:ring-red-300',

  warning:
    'bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-300',

  info:
    'bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-300',

  outline:
    'border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 focus:ring-gray-300',

  ghost:
    'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-300'

};
