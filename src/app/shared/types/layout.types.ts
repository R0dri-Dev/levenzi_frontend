/**
 * ============================================================
 * LEVENZI DESIGN SYSTEM — LAYOUT TOKENS
 * ============================================================
 * Breakpoints, anchos de contenedor, columnas de grid y aspect-ratio.
 * ============================================================ */

/** Breakpoints estándar de Tailwind (referencia en px, para lógica en TS) */
export type LvBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const LV_BREAKPOINT_PX_MAP: Record<LvBreakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/** Ancho máximo de contenedor centrado, para páginas/secciones */
export type LvContainerWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export const LV_CONTAINER_CLASS_MAP: Record<LvContainerWidth, string> = {
  sm: 'max-w-screen-sm mx-auto',
  md: 'max-w-screen-md mx-auto',
  lg: 'max-w-screen-lg mx-auto',
  xl: 'max-w-screen-xl mx-auto',
  '2xl': 'max-w-screen-2xl mx-auto',
  full: 'w-full',
};

/** Columnas de grid más usadas en dashboards y formularios */
export type LvGridCols = 1 | 2 | 3 | 4 | 5 | 6 | 12;

export const LV_GRID_COLS_CLASS_MAP: Record<LvGridCols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
};

/** Columnas responsivas típicas para cards/dashboards (md: 2 cols, lg: 3 cols, etc.) */
export const LV_RESPONSIVE_GRID_CLASS_MAP: Record<'cards-2' | 'cards-3' | 'cards-4', string> = {
  'cards-2': 'grid-cols-1 md:grid-cols-2',
  'cards-3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  'cards-4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

/** Relaciones de aspecto para imágenes, thumbnails, mapas embebidos */
export type LvAspectRatio = 'square' | 'video' | 'portrait' | 'wide';

export const LV_ASPECT_RATIO_CLASS_MAP: Record<LvAspectRatio, string> = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  wide: 'aspect-[21/9]',
};

/** Divisores horizontales/verticales (separar secciones de un card, items de un menú) */
export type LvDividerOrientation = 'horizontal' | 'vertical';

export const LV_DIVIDER_CLASS_MAP: Record<LvDividerOrientation, string> = {
  horizontal: 'w-full border-t border-gray-200',
  vertical: 'h-full border-l border-gray-200',
};
