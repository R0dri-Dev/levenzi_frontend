/**
 * ============================================================
 * LEVENZI DESIGN SYSTEM — CURSOR & OPACITY TOKENS
 * ============================================================ */

export type LvCursor =
  | 'default'
  | 'pointer'
  | 'not-allowed'
  | 'wait'
  | 'grab'
  | 'grabbing'
  | 'text'
  | 'help';

export const LV_CURSOR_CLASS_MAP: Record<LvCursor, string> = {
  default: 'cursor-default',
  pointer: 'cursor-pointer',
  'not-allowed': 'cursor-not-allowed',
  wait: 'cursor-wait',
  grab: 'cursor-grab',
  grabbing: 'cursor-grabbing',
  text: 'cursor-text',
  help: 'cursor-help',
};

/** Escala de opacidad general (backdrops, estados deshabilitados, hover suave) */
export type LvOpacity = 0 | 10 | 25 | 50 | 75 | 90 | 100;

export const LV_OPACITY_CLASS_MAP: Record<LvOpacity, string> = {
  0: 'opacity-0',
  10: 'opacity-10',
  25: 'opacity-25',
  50: 'opacity-50',
  75: 'opacity-75',
  90: 'opacity-90',
  100: 'opacity-100',
};
