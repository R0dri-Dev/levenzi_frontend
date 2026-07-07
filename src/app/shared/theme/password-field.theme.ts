// src/app/shared/theme/password-field.theme.ts
export const LV_PASSWORD_FIELD_BASE = 'w-full space-y-1.5';

export const LV_PASSWORD_FIELD_CONTAINER =
  'relative flex items-center w-full bg-white border border-gray-300 rounded-xl transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent';

export const LV_PASSWORD_FIELD_SIZES = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-3.5 py-2 text-sm',
  lg: 'px-4.5 py-2.5 text-base',
};

export const LV_PASSWORD_FIELD_INPUT =
  'w-full bg-transparent border-0 outline-none text-gray-900 placeholder-gray-400';

export const LV_PASSWORD_FIELD_TOGGLE =
  'absolute right-2 text-gray-400 hover:text-gray-600 transition-colors duration-200';

export const LV_PASSWORD_FIELD_STRENGTH_BAR =
  'w-full h-1 rounded-full bg-gray-200 overflow-hidden';

export const LV_PASSWORD_FIELD_STRENGTH_FILL = {
  weak: 'w-1/4 bg-red-500',
  medium: 'w-1/2 bg-yellow-500',
  strong: 'w-3/4 bg-green-500',
  'very-strong': 'w-full bg-green-600',
};

export const LV_PASSWORD_FIELD_STRENGTH_TEXT = {
  weak: 'text-red-500',
  medium: 'text-yellow-500',
  strong: 'text-green-500',
  'very-strong': 'text-green-600',
};

export const LV_PASSWORD_FIELD_ERROR =
  'text-sm text-red-500';

export const LV_PASSWORD_FIELD_HINT =
  'text-sm text-gray-500 mt-1';
