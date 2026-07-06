import { RadioSize } from '../types/radio.types';

export const LV_RADIO_BASE =
  'text-blue-600 border-gray-300 focus:ring-4 focus:ring-blue-300 disabled:opacity-60 disabled:cursor-not-allowed';

export const LV_RADIO_SIZES: Record<RadioSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};
