// src/app/shared/theme/stat-card.theme.ts
export const LV_STAT_CARD_BASE =
  'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md';

export const LV_STAT_CARD_SIZES = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const LV_STAT_CARD_VARIANTS = {
  primary: 'border-l-4 border-l-blue-500 dark:border-l-blue-400',
  secondary: 'border-l-4 border-l-gray-500 dark:border-l-gray-400',
  success: 'border-l-4 border-l-green-500 dark:border-l-green-400',
  danger: 'border-l-4 border-l-red-500 dark:border-l-red-400',
  warning: 'border-l-4 border-l-yellow-500 dark:border-l-yellow-400',
  info: 'border-l-4 border-l-purple-500 dark:border-l-purple-400',
};

export const LV_STAT_CARD_ICON =
  'rounded-full p-2 flex items-center justify-center';

export const LV_STAT_CARD_ICON_VARIANTS = {
  primary: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  secondary: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  success: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  danger: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  warning: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
  info: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
};

export const LV_STAT_CARD_TITLE =
  'text-sm font-medium text-gray-500 dark:text-gray-400';

export const LV_STAT_CARD_VALUE =
  'text-2xl font-bold text-gray-900 dark:text-white';

export const LV_STAT_CARD_TREND =
  'inline-flex items-center gap-1 text-xs font-medium';

export const LV_STAT_CARD_TREND_UP = 'text-green-600 dark:text-green-400';
export const LV_STAT_CARD_TREND_DOWN = 'text-red-600 dark:text-red-400';
export const LV_STAT_CARD_TREND_STABLE = 'text-gray-600 dark:text-gray-400';

export const LV_STAT_CARD_DESCRIPTION =
  'text-sm text-gray-500 dark:text-gray-400';
