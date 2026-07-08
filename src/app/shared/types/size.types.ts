/**
 * ============================================================
 * LEVENZI DESIGN SYSTEM — SIZE TOKENS
 * ============================================================
 * Escala de tamaños para botones, inputs, badges, avatars, etc.
 * ============================================================
 */

export type LvSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface LvSizeClasses {
  /** Padding combinado (x + y) */
  padding: string;
  paddingX: string;
  paddingY: string;
  /** Tamaño de fuente */
  text: string;
  /** Altura fija, útil para inputs/botones que deben alinearse en una fila */
  height: string;
  /** Tamaño de icono (para lucide-angular) */
  iconSize: string;
  /** Gap entre icono y texto */
  gap: string;
}

export const LV_SIZE_MAP: Record<LvSize, LvSizeClasses> = {
  xs: {
    padding: 'px-2 py-1',
    paddingX: 'px-2',
    paddingY: 'py-1',
    text: 'text-xs',
    height: 'h-6',
    iconSize: 'w-3.5 h-3.5',
    gap: 'gap-1',
  },
  sm: {
    padding: 'px-3 py-1.5',
    paddingX: 'px-3',
    paddingY: 'py-1.5',
    text: 'text-sm',
    height: 'h-8',
    iconSize: 'w-4 h-4',
    gap: 'gap-1.5',
  },
  md: {
    padding: 'px-4 py-2',
    paddingX: 'px-4',
    paddingY: 'py-2',
    text: 'text-sm',
    height: 'h-10',
    iconSize: 'w-5 h-5',
    gap: 'gap-2',
  },
  lg: {
    padding: 'px-5 py-2.5',
    paddingX: 'px-5',
    paddingY: 'py-2.5',
    text: 'text-base',
    height: 'h-12',
    iconSize: 'w-5 h-5',
    gap: 'gap-2',
  },
  xl: {
    padding: 'px-6 py-3',
    paddingX: 'px-6',
    paddingY: 'py-3',
    text: 'text-lg',
    height: 'h-14',
    iconSize: 'w-6 h-6',
    gap: 'gap-2.5',
  },
};

export const LV_SIZES: LvSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

/** Tamaño por defecto que deben usar todos los componentes lv-* si no se especifica @Input() */
export const LV_DEFAULT_SIZE: LvSize = 'md';
