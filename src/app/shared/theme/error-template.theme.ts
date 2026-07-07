// src/app/shared/theme/error-template.theme.ts
import type { ErrorTemplateVariant } from '../types/error-template.types';

export const LV_ERROR_TEMPLATE_BASE =
  'min-h-screen flex items-center justify-center bg-gray-50 p-4';

export const LV_ERROR_TEMPLATE_CONTAINER =
  'text-center max-w-md mx-auto';

export const LV_ERROR_TEMPLATE_CODE =
  'text-8xl font-bold';

export const LV_ERROR_TEMPLATE_VARIANTS: Record<ErrorTemplateVariant, string> = {
  '404': 'text-blue-600',
  '500': 'text-red-600',
  '403': 'text-yellow-600',
  'default': 'text-gray-600',
};

export const LV_ERROR_TEMPLATE_TITLE =
  'text-2xl font-semibold text-gray-900 mt-4';

export const LV_ERROR_TEMPLATE_MESSAGE =
  'text-gray-600 mt-2';

export const LV_ERROR_TEMPLATE_ACTIONS =
  'mt-6';

export const LV_ERROR_TEMPLATE_ICON =
  'mx-auto mb-4 text-gray-400';
