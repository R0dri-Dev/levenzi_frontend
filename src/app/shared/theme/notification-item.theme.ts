// src/app/shared/theme/notification-item.theme.ts
export const LV_NOTIFICATION_ITEM_BASE =
  'flex items-start gap-3 bg-white rounded-xl border border-gray-200 shadow-lg transition-all duration-300';

export const LV_NOTIFICATION_ITEM_SIZES = {
  sm: 'p-3 max-w-sm',
  md: 'p-4 max-w-md',
  lg: 'p-5 max-w-lg',
};

export const LV_NOTIFICATION_ITEM_VARIANTS = {
  info: 'border-l-4 border-l-blue-500',
  success: 'border-l-4 border-l-green-500',
  warning: 'border-l-4 border-l-yellow-500',
  danger: 'border-l-4 border-l-red-500',
};

export const LV_NOTIFICATION_ITEM_ICON =
  'rounded-full p-1.5 flex-shrink-0';

export const LV_NOTIFICATION_ITEM_ICON_VARIANTS = {
  info: 'bg-blue-100 text-blue-600',
  success: 'bg-green-100 text-green-600',
  warning: 'bg-yellow-100 text-yellow-600',
  danger: 'bg-red-100 text-red-600',
};

export const LV_NOTIFICATION_ITEM_ICON_ICONS = {
  info: 'info',
  success: 'check-circle',
  warning: 'alert-triangle',
  danger: 'x-circle',
};

export const LV_NOTIFICATION_ITEM_TITLE =
  'text-sm font-semibold text-gray-900';

export const LV_NOTIFICATION_ITEM_MESSAGE =
  'text-sm text-gray-600';

export const LV_NOTIFICATION_ITEM_TIME =
  'text-xs text-gray-400 ';

export const LV_NOTIFICATION_ITEM_CLOSE =
  'text-gray-400 hover:text-gray-600 transition-colors duration-200 flex-shrink-0';
