// src/app/shared/theme/confirm-dialog.theme.ts
export const LV_CONFIRM_DIALOG_OVERLAY =
  'fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in';

export const LV_CONFIRM_DIALOG_BASE =
  'bg-white rounded-2xl shadow-2xl w-full max-w-md animate-slide-up';

export const LV_CONFIRM_DIALOG_VARIANTS = {
  danger: 'border-t-4 border-red-500',
  warning: 'border-t-4 border-yellow-500',
  info: 'border-t-4 border-blue-500',
  success: 'border-t-4 border-green-500',
};

export const LV_CONFIRM_DIALOG_ICON =
  'w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4';

export const LV_CONFIRM_DIALOG_ICON_VARIANTS = {
  danger: 'bg-red-100 text-red-600',
  warning: 'bg-yellow-100 text-yellow-600',
  info: 'bg-blue-100 text-blue-600',
  success: 'bg-green-100 text-green-600',
};

export const LV_CONFIRM_DIALOG_ICON_ICONS = {
  danger: 'alert-triangle',
  warning: 'alert-triangle',
  info: 'info',
  success: 'check-circle',
};

export const LV_CONFIRM_DIALOG_TITLE =
  'text-lg font-semibold text-gray-900 text-center';

export const LV_CONFIRM_DIALOG_MESSAGE =
  'text-sm text-gray-600 text-center mt-2';


export const LV_CONFIRM_DIALOG_ACTIONS =
  'flex items-center justify-center gap-3 mt-6';
