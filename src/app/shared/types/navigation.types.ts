/**
 * ============================================================
 * LEVENZI DESIGN SYSTEM — NAVIGATION TOKENS
 * ============================================================
 * Tabs, breadcrumbs, paginación y tags/chips.
 * ============================================================ */

/** Estilo visual de las pestañas */
export type LvTabStyle = 'underline' | 'pills' | 'boxed';

export const LV_TAB_STYLE_CLASS_MAP: Record<LvTabStyle, { base: string; active: string; inactive: string }> = {
  underline: {
    base: 'border-b-2 -mb-px px-4 py-2 text-sm font-medium transition-colors',
    active: 'border-blue-600 text-blue-600',
    inactive: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
  },
  pills: {
    base: 'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
    active: 'bg-blue-600 text-white',
    inactive: 'text-gray-600 hover:bg-gray-100',
  },
  boxed: {
    base: 'px-4 py-2 text-sm font-medium border rounded-t-lg -mb-px transition-colors',
    active: 'bg-white border-gray-200 border-b-white text-blue-600',
    inactive: 'bg-gray-50 border-transparent text-gray-500 hover:text-gray-700',
  },
};

/** Item individual de un breadcrumb */
export interface LvBreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

/** Tamaños de paginación */
export type LvPaginationSize = 'sm' | 'md' | 'lg';

export const LV_PAGINATION_SIZE_CLASS_MAP: Record<LvPaginationSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

/** Estilo de tags/chips (filtros, categorías, estados de pedido) */
export type LvTagStyle = 'solid' | 'light' | 'outline';

export const LV_TAG_STYLE_CLASS_MAP: Record<LvTagStyle, string> = {
  solid: 'text-white',
  light: '',
  outline: 'bg-transparent border',
};

/** Un tag puede ser removible (con botón x) o solo informativo */
export interface LvTagProps {
  removable?: boolean;
  style?: LvTagStyle;
}
