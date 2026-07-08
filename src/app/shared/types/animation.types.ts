/**
 * ============================================================
 * LEVENZI DESIGN SYSTEM — ANIMATION TOKENS
 * ============================================================
 * Animaciones de entrada/salida para modales, drawers, dropdowns,
 * toasts, tooltips y skeletons.
 *
 * IMPORTANTE:
 * - `spin`, `pulse`, `bounce`, `ping` vienen incluidas en Tailwind
 *   por defecto y funcionan sin configurar nada más.
 * - El resto (fade, slide, scale, shimmer) son animaciones custom
 *   de Levenzi y requieren registrar los keyframes UNA sola vez en
 *   tu `src/styles.css` (ver bloque comentado al final del archivo).
 * ============================================================ */

export type LvAnimation =
  | 'none'
  | 'spin'
  | 'pulse'
  | 'bounce'
  | 'ping'
  | 'fade-in'
  | 'fade-out'
  | 'slide-in-right'
  | 'slide-in-left'
  | 'slide-in-top'
  | 'slide-in-bottom'
  | 'scale-in'
  | 'shimmer';

export const LV_ANIMATION_CLASS_MAP: Record<LvAnimation, string> = {
  none: '',
  spin: 'animate-spin',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  ping: 'animate-ping',
  'fade-in': 'animate-lv-fade-in',
  'fade-out': 'animate-lv-fade-out',
  'slide-in-right': 'animate-lv-slide-in-right',
  'slide-in-left': 'animate-lv-slide-in-left',
  'slide-in-top': 'animate-lv-slide-in-top',
  'slide-in-bottom': 'animate-lv-slide-in-bottom',
  'scale-in': 'animate-lv-scale-in',
  shimmer: 'animate-lv-shimmer',
};

/** Animación recomendada por tipo de componente, para no decidir cada vez */
export const LV_ANIMATION_USAGE: Record<string, LvAnimation> = {
  modal: 'scale-in',
  drawer: 'slide-in-right',
  dropdown: 'fade-in',
  toast: 'slide-in-top',
  tooltip: 'fade-in',
  skeleton: 'shimmer',
  spinner: 'spin',
  alert: 'fade-in',
};

/**
 * ============================================================
 * REGISTRO DE KEYFRAMES (una sola vez, en src/styles.css)
 * ============================================================
 * Tailwind CSS v4 usa @theme en vez de tailwind.config.js.
 * Pega esto en tu styles.css global:
 *
 * @theme {
 *   --animate-lv-fade-in: lv-fade-in 0.2s ease-out;
 *   --animate-lv-fade-out: lv-fade-out 0.2s ease-in;
 *   --animate-lv-slide-in-right: lv-slide-in-right 0.25s ease-out;
 *   --animate-lv-slide-in-left: lv-slide-in-left 0.25s ease-out;
 *   --animate-lv-slide-in-top: lv-slide-in-top 0.25s ease-out;
 *   --animate-lv-slide-in-bottom: lv-slide-in-bottom 0.25s ease-out;
 *   --animate-lv-scale-in: lv-scale-in 0.15s ease-out;
 *   --animate-lv-shimmer: lv-shimmer 1.5s linear infinite;
 * }
 *
 * @keyframes lv-fade-in {
 *   from { opacity: 0; }
 *   to { opacity: 1; }
 * }
 * @keyframes lv-fade-out {
 *   from { opacity: 1; }
 *   to { opacity: 0; }
 * }
 * @keyframes lv-slide-in-right {
 *   from { transform: translateX(100%); opacity: 0; }
 *   to { transform: translateX(0); opacity: 1; }
 * }
 * @keyframes lv-slide-in-left {
 *   from { transform: translateX(-100%); opacity: 0; }
 *   to { transform: translateX(0); opacity: 1; }
 * }
 * @keyframes lv-slide-in-top {
 *   from { transform: translateY(-100%); opacity: 0; }
 *   to { transform: translateY(0); opacity: 1; }
 * }
 * @keyframes lv-slide-in-bottom {
 *   from { transform: translateY(100%); opacity: 0; }
 *   to { transform: translateY(0); opacity: 1; }
 * }
 * @keyframes lv-scale-in {
 *   from { transform: scale(0.95); opacity: 0; }
 *   to { transform: scale(1); opacity: 1; }
 * }
 * @keyframes lv-shimmer {
 *   0% { background-position: -200% 0; }
 *   100% { background-position: 200% 0; }
 * }
 * ============================================================
 */
