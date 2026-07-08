/**
 * ============================================================
 * LEVENZI DESIGN SYSTEM — LOADING TOKENS
 * ============================================================
 * Spinners, skeletons y overlays de bloqueo mientras se hace fetch
 * (tablas de pedidos, rutas, dashboards, etc.)
 * ============================================================ */

export type LvLoadingVariant = 'spinner' | 'skeleton' | 'dots' | 'bar';

export type LvSpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const LV_SPINNER_SIZE_CLASS_MAP: Record<LvSpinnerSize, string> = {
  xs: 'w-3 h-3 border-2',
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-[3px]',
  xl: 'w-12 h-12 border-4',
};

/**
 * Clase base del spinner circular. Combínala con LV_SPINNER_SIZE_CLASS_MAP
 * y un color de texto de LV_COLOR_MAP (usa `text` porque el spinner pinta
 * con `border-current`).
 * Ej: `${LV_SPINNER_BASE_CLASS} ${LV_SPINNER_SIZE_CLASS_MAP.md} ${LV_COLOR_MAP.primary.text}`
 */
export const LV_SPINNER_BASE_CLASS =
  'inline-block rounded-full border-solid border-current border-r-transparent animate-spin';

/** Clase base para bloques skeleton (placeholder mientras carga contenido) */
export const LV_SKELETON_BASE_CLASS = 'bg-gray-200 rounded-md animate-pulse';

/** Alturas/formas típicas de skeleton según el tipo de contenido que reemplaza */
export type LvSkeletonShape = 'text' | 'title' | 'avatar' | 'thumbnail' | 'button' | 'row';

export const LV_SKELETON_SHAPE_CLASS_MAP: Record<LvSkeletonShape, string> = {
  text: 'h-4 w-full',
  title: 'h-6 w-1/3',
  avatar: 'h-10 w-10 rounded-full',
  thumbnail: 'h-32 w-full',
  button: 'h-10 w-24',
  row: 'h-12 w-full',
};

/** Overlay semitransparente para bloquear una sección mientras carga (ej: tabla haciendo fetch) */
export const LV_LOADING_OVERLAY_CLASS =
  'absolute inset-0 bg-white/70 flex items-center justify-center z-20';

/** Barra de progreso indeterminada (loading bar arriba de una tabla o página) */
export const LV_LOADING_BAR_TRACK_CLASS = 'w-full h-1 bg-gray-100 overflow-hidden rounded-full';
export const LV_LOADING_BAR_FILL_CLASS = 'h-full bg-blue-600 animate-lv-shimmer';

/** Props que debería extender cualquier componente que pueda mostrar un estado de carga */
export interface LvLoadingProps {
  loading?: boolean;
  loadingVariant?: LvLoadingVariant;
  loadingText?: string;
}
