/**
 * ============================================================
 * LEVENZI DESIGN SYSTEM — ALERT TYPES
 * ============================================================
 * Tipos específicos para el componente LvAlert
 * ============================================================
 */

import { LvStatus } from './common.types';

// Iconos disponibles para alertas
export type LvAlertIcon = 'check' | 'x' | 'triangle' | 'info' | 'spinner';

// Mapa de iconos por estado
export const LV_ALERT_ICON_MAP: Record<LvStatus, LvAlertIcon> = {
  idle: 'info',
  loading: 'spinner',
  success: 'check',
  error: 'x',
  warning: 'triangle',
  info: 'info',
};

// Títulos por estado
export const LV_ALERT_TITLE_MAP: Record<LvStatus, string> = {
  idle: 'Inactivo',
  loading: 'Cargando...',
  success: 'Éxito',
  error: 'Error',
  warning: 'Advertencia',
  info: 'Información',
};

// Mapa de iconos para SweetAlert2
export const LV_ALERT_SWEET_ICON_MAP: Record<LvStatus, 'success' | 'error' | 'warning' | 'info' | 'question'> = {
  idle: 'question',
  loading: 'info',
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
};
