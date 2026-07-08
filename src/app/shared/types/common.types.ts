/**
 * ============================================================
 * LEVENZI DESIGN SYSTEM — COMMON / SHARED TYPES
 * ============================================================
 */

import { LvSize } from './size.types';
import { LvRadius } from './radius.types';
import { LvShadow } from './shadow.types';
import { LvColorVariant } from './colors.types';

// ============================================================
// ESTADOS Y APARIENCIAS
// ============================================================

export type LvState = 'default' | 'hover' | 'active' | 'disabled' | 'loading';
export type LvAppearance = 'solid' | 'outline' | 'ghost' | 'light';

// Estados básicos
export type LvStatus = 'idle' | 'loading' | 'success' | 'error' | 'warning' | 'info';

// ============================================================
// ALINEACIÓN
// ============================================================

// Alineación de texto
export type LvTextAlign = 'left' | 'center' | 'right' | 'justify';

// Alineación de contenido
export type LvAlign = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

// ============================================================
// VARIANTES DE ALERT
// ============================================================

export type LvAlertStyle = 'solid' | 'light' | 'outline' | 'left-accent';

// ============================================================
// PROPS BASE
// ============================================================

export interface LvBaseComponentProps {
  variant?: LvColorVariant;
  size?: LvSize;
  rounded?: LvRadius;
  shadow?: LvShadow;
  appearance?: LvAppearance;
  disabled?: boolean;
  fullWidth?: boolean;
  customClass?: string;
}

export type LvPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right';

export type LvWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
// ============================================================
// MAPAS DE CLASES (SOLO ALINEACIÓN)
// ============================================================

// Alineación de contenido (justify-content)
export const LV_ALIGN_CLASS_MAP: Record<LvAlign, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

// Alineación de texto
export const LV_TEXT_ALIGN_CLASS_MAP: Record<LvTextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};
