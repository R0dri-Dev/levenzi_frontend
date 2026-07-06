// src/app/shared/theme/modal.theme.ts
export const LV_MODAL_OVERLAY =
  'fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in';

export const LV_MODAL_BASE =
  'bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-h-[90vh] flex flex-col animate-slide-up';

export const LV_MODAL_SIZES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
};

export const LV_MODAL_VARIANTS = {
  default: 'border-t-4 border-blue-500 dark:border-blue-400',
  danger: 'border-t-4 border-red-500 dark:border-red-400',
  success: 'border-t-4 border-green-500 dark:border-green-400',
  warning: 'border-t-4 border-yellow-500 dark:border-yellow-400',
  info: 'border-t-4 border-purple-500 dark:border-purple-400',
};

export const LV_MODAL_HEADER =
  'flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700';

export const LV_MODAL_TITLE =
  'text-lg font-semibold text-gray-900 dark:text-white';

export const LV_MODAL_BODY =
  'flex-1 overflow-y-auto px-6 py-4';

export const LV_MODAL_FOOTER =
  'flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700';
