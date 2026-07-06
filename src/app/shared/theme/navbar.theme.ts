// src/app/shared/theme/navbar.theme.ts
export const LV_NAVBAR_BASE =
  'flex items-center justify-between px-4 py-2 transition-all duration-200';

export const LV_NAVBAR_VARIANTS = {
  default: 'bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700',
  glass: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700',
  dark: 'bg-gray-900 dark:bg-gray-950 border-b border-gray-700 dark:border-gray-800',
};

export const LV_NAVBAR_POSITIONS = {
  fixed: 'fixed top-0 left-0 right-0 z-50',
  sticky: 'sticky top-0 z-40',
  static: 'relative',
};

export const LV_NAVBAR_BRAND =
  'flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white';

export const LV_NAVBAR_ACTIONS =
  'flex items-center gap-2';

export const LV_NAVBAR_ITEM =
  'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200';

export const LV_NAVBAR_ITEM_ACTIVE =
  'text-blue-600 dark:text-blue-400';

export const LV_NAVBAR_MOBILE_BUTTON =
  'lg:hidden';

export const LV_NAVBAR_DESKTOP_MENU =
  'hidden lg:flex items-center gap-4';

export const LV_NAVBAR_MOBILE_MENU =
  'lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2';
