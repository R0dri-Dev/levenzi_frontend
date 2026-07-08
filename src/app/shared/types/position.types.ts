/**
 * ============================================================
 * LEVENZI DESIGN SYSTEM — POSITION TOKENS
 * ============================================================
 * Posicionamiento de overlays, toasts, drawers y elementos sticky.
 * ============================================================ */

/** Fondo detrás de un modal/drawer abierto */
export type LvOverlayBackdrop = 'none' | 'light' | 'dark' | 'blur';

export const LV_BACKDROP_CLASS_MAP: Record<LvOverlayBackdrop, string> = {
  none: '',
  light: 'bg-white/50',
  dark: 'bg-gray-900/50',
  blur: 'bg-gray-900/30 backdrop-blur-sm',
};

/** Posición de toasts/notificaciones en pantalla */
export type LvToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export const LV_TOAST_POSITION_CLASS_MAP: Record<LvToastPosition, string> = {
  'top-left': 'fixed top-4 left-4',
  'top-center': 'fixed top-4 left-1/2 -translate-x-1/2',
  'top-right': 'fixed top-4 right-4',
  'bottom-left': 'fixed bottom-4 left-4',
  'bottom-center': 'fixed bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'fixed bottom-4 right-4',
};

/** Lado por el que entra un drawer/panel lateral */
export type LvDrawerPosition = 'left' | 'right' | 'top' | 'bottom';

export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';


export const LV_DRAWER_POSITION_CLASS_MAP: Record<LvDrawerPosition, string> = {
  left: 'inset-y-0 left-0 h-full',
  right: 'inset-y-0 right-0 h-full',
  top: 'inset-x-0 top-0 w-full',
  bottom: 'inset-x-0 bottom-0 w-full',
};

/** Elementos pegajosos: header de tabla, barra de acciones, footer de formulario */
export type LvStickyPosition = 'top' | 'bottom';

export const LV_STICKY_CLASS_MAP: Record<LvStickyPosition, string> = {
  top: 'sticky top-0',
  bottom: 'sticky bottom-0',
};
