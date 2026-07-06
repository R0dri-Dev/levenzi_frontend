// src/app/shared/theme/confirm-dialog.theme.ts
export const LV_CONFIRM_DIALOG_OVERLAY =
  'fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in';

export const LV_CONFIRM_DIALOG_BASE =
  'bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md animate-slide-up';

export const LV_CONFIRM_DIALOG_VARIANTS = {
  danger: 'border-t-4 border-red-500 dark:border-red-400',
  warning: 'border-t-4 border-yellow-500 dark:border-yellow-400',
  info: 'border-t-4 border-blue-500 dark:border-blue-400',
  success: 'border-t-4 border-green-500 dark:border-green-400',
};

export const LV_CONFIRM_DIALOG_ICON =
  'w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4';

export const LV_CONFIRM_DIALOG_ICON_VARIANTS = {
  danger: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
  info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  success: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
};

export const LV_CONFIRM_DIALOG_ICON_ICONS = {
  danger: 'alert-triangle',
  warning: 'alert-triangle',
  info: 'info',
  success: 'check-circle',
};

export const LV_CONFIRM_DIALOG_TITLE =
  'text-lg font-semibold text-gray-900 dark:text-white text-center';

export const LV_CONFIRM_DIALOG_MESSAGE =
  'text-sm text-gray-600 dark:text-gray-400 text-center mt-2';

export const LV_CONFIRM_DIALOG_ACTIONS =
  'flex items-center justify-center gap-3 mt-6';
