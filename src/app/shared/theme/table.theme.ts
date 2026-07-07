// src/app/shared/theme/table.theme.ts
export const LV_TABLE_BASE = 'w-full text-left';

export const LV_TABLE_WRAPPER =
  'overflow-x-auto bg-white rounded-xl border border-gray-200';

export const LV_TABLE_VARIANTS = {
  default: '',
  striped: '[&_tbody_tr:nth-child(odd)]:bg-gray-50',
  bordered: 'border-collapse [&_td]:border [&_th]:border border-gray-200',
  hover: '[&_tbody_tr:hover]:bg-gray-50',
};

export const LV_TABLE_HEAD =
  'bg-gray-50 text-xs font-semibold text-gray-700 uppercase tracking-wider';

export const LV_TABLE_HEAD_CELL =
  'px-4 py-3 text-left whitespace-nowrap';

export const LV_TABLE_HEAD_CELL_SIZES = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-3 text-sm',
  lg: 'px-5 py-4 text-base',
};

export const LV_TABLE_HEAD_CELL_ALIGN = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const LV_TABLE_BODY =
  'divide-y divide-gray-200';

export const LV_TABLE_ROW =
  'transition-colors duration-200';

export const LV_TABLE_ROW_SELECTED =
  'bg-blue-50';

export const LV_TABLE_CELL =
  'px-4 py-3 text-sm text-gray-700 ';

export const LV_TABLE_CELL_SIZES = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-3 text-sm',
  lg: 'px-5 py-4 text-base',
};

export const LV_TABLE_CELL_ALIGN = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const LV_TABLE_EMPTY =
  'text-center py-8 text-gray-500';

export const LV_TABLE_CHECKBOX =
  'w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500';

export const LV_TABLE_SORT_ICON =
  'inline-flex ml-1 w-4 h-4 text-gray-400';

export const LV_TABLE_SORT_ACTIVE =
  'text-blue-600';

export const LV_TABLE_PAGINATION =
  'flex items-center justify-between px-4 py-3 border-t border-gray-200';

export const LV_TABLE_PAGINATION_INFO =
  'text-sm text-gray-700';

export const LV_TABLE_PAGINATION_BUTTONS =
  'flex items-center gap-1';

export const LV_TABLE_PAGINATION_BUTTON =
  'px-3 py-1 text-sm rounded-lg border border-gray-300  text-gray-700 hover:bg-gray-50  transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

export const LV_TABLE_PAGINATION_BUTTON_ACTIVE =
  'bg-blue-50 border-blue-500text-blue-600';
