// src/app/shared/theme/form-template.theme.ts
import type { FormTemplateVariant, FormTemplateSize } from '../types/form-template.types';

export const LV_FORM_TEMPLATE_BASE =
  'w-full';

export const LV_FORM_TEMPLATE_VARIANTS: Record<FormTemplateVariant, string> = {
  default: '',
  card: 'bg-white rounded-2xl shadow-xl p-6',
  full: 'min-h-screen',
};

export const LV_FORM_TEMPLATE_SIZES: Record<FormTemplateSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export const LV_FORM_TEMPLATE_HEADER =
  'mb-6';

export const LV_FORM_TEMPLATE_TITLE =
  'text-2xl font-bold text-gray-900';

export const LV_FORM_TEMPLATE_SUBTITLE =
  'text-sm text-gray-500 mt-1';

export const LV_FORM_TEMPLATE_BODY =
  'space-y-4';

export const LV_FORM_TEMPLATE_FOOTER =
  'mt-6 pt-4 border-t border-gray-200';
