import { SwitchSize } from '../types/switch.types';

export const LV_SWITCH_BASE =
  'relative inline-flex cursor-pointer rounded-full transition-all duration-300';

export const LV_SWITCH_SIZES: Record<SwitchSize, string> = {

  sm: 'w-10 h-5',

  md: 'w-12 h-6',

  lg: 'w-14 h-7'

};

export const LV_SWITCH_THUMB: Record<SwitchSize, string> = {

  sm: 'h-4 w-4',

  md: 'h-5 w-5',

  lg: 'h-6 w-6'

};
