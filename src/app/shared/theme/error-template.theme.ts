// src/app/shared/theme/error-template.theme.ts
export const LV_ERROR_TEMPLATE_BASE =
  'min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4';

export const LV_ERROR_TEMPLATE_CONTAINER =
  'text-center max-w-md mx-auto';

export const LV_ERROR_TEMPLATE_CODE =
  'text-8xl font-bold text-gray-900 dark:text-white';

export const LV_ERROR_TEMPLATE_VARIANTS = {
  '404': 'text-blue-600 dark:text-blue-400',
  '500': 'text-red-600 dark:text-red-400',
  '403': 'text-yellow-600 dark:text-yellow-400',
  default: 'text-gray-600 dark:text-gray-400',
};

export const LV_ERROR_TEMPLATE_TITLE =
  'text-2xl font-semibold text-gray-900 dark:text-white mt-4';

export const LV_ERROR_TEMPLATE_MESSAGE =
  'text-gray-600 dark:text-gray-400 mt-2';

export const LV_ERROR_TEMPLATE_ACTIONS =
  'mt-6';
