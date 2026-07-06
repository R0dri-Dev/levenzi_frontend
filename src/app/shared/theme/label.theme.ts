import type { LabelSize, LabelVariant } from '../types/label.types';

export const LV_LABEL_BASE =
  'font-medium text-gray-700 transition-all duration-200';

export const LV_LABEL_SIZES: Record<LabelSize, string> = {
  sm: 'text-sm leading-5',
  md: 'text-base leading-6',
  lg: 'text-lg leading-7',
};

export const LV_LABEL_VARIANTS: Record<LabelVariant, string> = {
  primary: 'text-gray-700',
  muted: 'text-gray-500',
  danger: 'text-red-600',
};

