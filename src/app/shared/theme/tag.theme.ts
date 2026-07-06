import { TagVariant } from '../types/tag.types';

export const LV_TAG_BASE =
  'inline-flex items-center rounded-lg px-3 py-1 text-xs font-semibold';

export const LV_TAG_VARIANTS: Record<TagVariant, string> = {

  primary: 'bg-blue-100 text-blue-700',

  secondary: 'bg-gray-100 text-gray-700',

  success: 'bg-green-100 text-green-700',

  danger: 'bg-red-100 text-red-700',

  warning: 'bg-yellow-100 text-yellow-700'

};
