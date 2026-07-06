// src/app/shared/theme/app-sidebar.theme.ts
export const LV_APP_SIDEBAR_BASE =
  'h-full overflow-y-auto transition-all duration-300 flex-shrink-0';

export const LV_APP_SIDEBAR_VARIANTS = {
  default: 'bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700',
  dark: 'bg-gray-900 dark:bg-gray-950 border-r border-gray-700 dark:border-gray-800',
  compact: 'bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700',
};

export const LV_APP_SIDEBAR_SIZES = {
  sm: 'w-48',
  md: 'w-56',
  lg: 'w-64',
};

export const LV_APP_SIDEBAR_COMPACT_SIZES = {
  sm: 'w-12',
  md: 'w-14',
  lg: 'w-16',
};

export const LV_APP_SIDEBAR_ITEM =
  'flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200 rounded-xl cursor-pointer';

export const LV_APP_SIDEBAR_ITEM_ACTIVE =
  'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';

export const LV_APP_SIDEBAR_ITEM_ICON =
  'w-5 h-5 flex-shrink-0';

export const LV_APP_SIDEBAR_ITEM_LABEL =
  'flex-1';

export const LV_APP_SIDEBAR_ITEM_BADGE =
  'px-2 py-0.5 text-xs font-medium rounded-full';

export const LV_APP_SIDEBAR_DIVIDER =
  'h-px bg-gray-200 dark:bg-gray-700 my-2';

export const LV_APP_SIDEBAR_HEADER =
  'px-4 py-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider';

export const LV_APP_SIDEBAR_FOOTER =
  'px-4 py-3 text-xs text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-700';
