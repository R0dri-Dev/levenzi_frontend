// src/app/shared/theme/drawer.theme.ts
export const LV_DRAWER_OVERLAY =
  'fixed inset-0 bg-black/50 dark:bg-black/70 z-50 animate-fade-in';

export const LV_DRAWER_BASE =
  'fixed bg-white dark:bg-gray-800 shadow-2xl transition-transform duration-300 z-50';

export const LV_DRAWER_POSITIONS = {
  left: 'left-0 top-0 h-full border-r border-gray-200 dark:border-gray-700',
  right: 'right-0 top-0 h-full border-l border-gray-200 dark:border-gray-700',
  top: 'top-0 left-0 w-full border-b border-gray-200 dark:border-gray-700',
  bottom: 'bottom-0 left-0 w-full border-t border-gray-200 dark:border-gray-700',
};

export const LV_DRAWER_SIZES = {
  left: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[32rem]',
    full: 'w-full',
  },
  right: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[32rem]',
    full: 'w-full',
  },
  top: {
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-80',
    xl: 'h-96',
    full: 'h-full',
  },
  bottom: {
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-80',
    xl: 'h-96',
    full: 'h-full',
  },
};

export const LV_DRAWER_VARIANTS = {
  default: 'bg-white dark:bg-gray-800',
  dark: 'bg-gray-900 dark:bg-gray-950 text-white',
  glass: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md',
};

export const LV_DRAWER_HEADER =
  'flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700';

export const LV_DRAWER_TITLE =
  'text-lg font-semibold text-gray-900 dark:text-white';

export const LV_DRAWER_BODY =
  'flex-1 overflow-y-auto px-6 py-4';

export const LV_DRAWER_FOOTER =
  'flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700';
