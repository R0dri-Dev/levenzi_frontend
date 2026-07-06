import { AvatarSize, AvatarStatus } from '../types/avatar.types';

export const LV_AVATAR_BASE =
  'relative inline-flex items-center justify-center overflow-hidden bg-gray-100 text-gray-700 font-semibold select-none';

export const LV_AVATAR_SIZES: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-xl',
};

export const LV_AVATAR_RADIUS = {
  rounded: 'rounded-xl',
  circle: 'rounded-full',
};

export const LV_AVATAR_STATUS: Record<AvatarStatus, string> = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  busy: 'bg-red-500',
  away: 'bg-yellow-400',
  none: 'hidden',
};
