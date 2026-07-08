/**
 * ============================================================
 * LEVENZI DESIGN SYSTEM — COLOR TOKENS
 * ============================================================
 * Sistema de colores semánticos para componentes lv-*
 * Angular 21 Standalone + Signals + Tailwind CSS v4 + Flowbite
 * Light mode ÚNICAMENTE (sin soporte dark mode)
 * ============================================================
 */

/** Variantes de color semánticas disponibles en todo el sistema */
export type LvColorVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'neutral';

/** Set completo de clases Tailwind que necesita un componente para una variante */
export interface LvColorClasses {
  /** Fondo sólido (botones, badges rellenos) */
  bg: string;
  /** Fondo en hover */
  bgHover: string;
  /** Fondo en active/pressed */
  bgActive: string;
  /** Fondo suave, para alerts / chips / backgrounds tenues */
  bgLight: string;
  /** Fondo suave en hover */
  bgLightHover: string;
  /** Texto con el color de la variante (sobre fondo blanco) */
  text: string;
  /** Texto que va SOBRE el fondo sólido (normalmente blanco) */
  textOnBg: string;
  /** Borde con el color de la variante */
  border: string;
  /** Borde en hover */
  borderHover: string;
  /** Anillo de foco (accesibilidad / Flowbite focus ring) */
  ring: string;
}

/**
 * Mapa central de clases Tailwind por variante.
 * Único punto de verdad: si cambias un color aquí, cambia en TODO el sistema.
 * Úsalo siempre a través de una función util, nunca escribas clases de color
 * "a mano" dentro de un componente lv-*.
 */
export const LV_COLOR_MAP: Record<LvColorVariant, LvColorClasses> = {
  primary: {
    bg: 'bg-blue-600',
    bgHover: 'hover:bg-blue-700',
    bgActive: 'active:bg-blue-800',
    bgLight: 'bg-blue-50',
    bgLightHover: 'hover:bg-blue-100',
    text: 'text-blue-600',
    textOnBg: 'text-white',
    border: 'border-blue-600',
    borderHover: 'hover:border-blue-700',
    ring: 'focus:ring-blue-500',
  },
  secondary: {
    bg: 'bg-gray-600',
    bgHover: 'hover:bg-gray-700',
    bgActive: 'active:bg-gray-800',
    bgLight: 'bg-gray-50',
    bgLightHover: 'hover:bg-gray-100',
    text: 'text-gray-600',
    textOnBg: 'text-white',
    border: 'border-gray-600',
    borderHover: 'hover:border-gray-700',
    ring: 'focus:ring-gray-500',
  },
  success: {
    bg: 'bg-emerald-600',
    bgHover: 'hover:bg-emerald-700',
    bgActive: 'active:bg-emerald-800',
    bgLight: 'bg-emerald-50',
    bgLightHover: 'hover:bg-emerald-100',
    text: 'text-emerald-600',
    textOnBg: 'text-white',
    border: 'border-emerald-600',
    borderHover: 'hover:border-emerald-700',
    ring: 'focus:ring-emerald-500',
  },
  danger: {
    bg: 'bg-red-600',
    bgHover: 'hover:bg-red-700',
    bgActive: 'active:bg-red-800',
    bgLight: 'bg-red-50',
    bgLightHover: 'hover:bg-red-100',
    text: 'text-red-600',
    textOnBg: 'text-white',
    border: 'border-red-600',
    borderHover: 'hover:border-red-700',
    ring: 'focus:ring-red-500',
  },
  warning: {
    bg: 'bg-amber-500',
    bgHover: 'hover:bg-amber-600',
    bgActive: 'active:bg-amber-700',
    bgLight: 'bg-amber-50',
    bgLightHover: 'hover:bg-amber-100',
    text: 'text-amber-600',
    textOnBg: 'text-white',
    border: 'border-amber-500',
    borderHover: 'hover:border-amber-600',
    ring: 'focus:ring-amber-400',
  },
  info: {
    bg: 'bg-sky-600',
    bgHover: 'hover:bg-sky-700',
    bgActive: 'active:bg-sky-800',
    bgLight: 'bg-sky-50',
    bgLightHover: 'hover:bg-sky-100',
    text: 'text-sky-600',
    textOnBg: 'text-white',
    border: 'border-sky-600',
    borderHover: 'hover:border-sky-700',
    ring: 'focus:ring-sky-500',
  },
  neutral: {
    bg: 'bg-slate-600',
    bgHover: 'hover:bg-slate-700',
    bgActive: 'active:bg-slate-800',
    bgLight: 'bg-slate-50',
    bgLightHover: 'hover:bg-slate-100',
    text: 'text-slate-600',
    textOnBg: 'text-white',
    border: 'border-slate-600',
    borderHover: 'hover:border-slate-700',
    ring: 'focus:ring-slate-500',
  },
};

export const LV_COLOR_VARIANTS: LvColorVariant[] = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'neutral',
];
