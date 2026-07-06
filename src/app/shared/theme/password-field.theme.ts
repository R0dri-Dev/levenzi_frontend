// src/app/shared/theme/password-field.theme.ts
export const LV_PASSWORD_FIELD_BASE = 'w-full space-y-1.5';

export const LV_PASSWORD_FIELD_CONTAINER =
  'relative flex items-center w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent';

export const LV_PASSWORD_FIELD_SIZES = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-3.5 py-2 text-sm',
  lg: 'px-4.5 py-2.5 text-base',
};

export const LV_PASSWORD_FIELD_INPUT =
  'w-full bg-transparent border-0 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500';

export const LV_PASSWORD_FIELD_TOGGLE =
  'absolute right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200';

export const LV_PASSWORD_FIELD_STRENGTH_BAR =
  'w-full h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden';

export const LV_PASSWORD_FIELD_STRENGTH_FILL = {
  weak: 'w-1/4 bg-red-500 dark:bg-red-400',
  medium: 'w-1/2 bg-yellow-500 dark:bg-yellow-400',
  strong: 'w-3/4 bg-green-500 dark:bg-green-400',
  'very-strong': 'w-full bg-green-600 dark:bg-green-500',
};

export const LV_PASSWORD_FIELD_STRENGTH_TEXT = {
  weak: 'text-red-500 dark:text-red-400',
  medium: 'text-yellow-500 dark:text-yellow-400',
  strong: 'text-green-500 dark:text-green-400',
  'very-strong': 'text-green-600 dark:text-green-500',
};

export const LV_PASSWORD_FIELD_ERROR =
  'text-sm text-red-500 dark:text-red-400 mt-1';

export const LV_PASSWORD_FIELD_HINT =
  'text-sm text-gray-500 dark:text-gray-400 mt-1';
