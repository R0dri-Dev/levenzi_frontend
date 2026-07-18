import { Pipe, PipeTransform } from '@angular/core';
import { LvColorVariant } from '../types/colors.types';

const STATUS_COLOR_MAP: Record<string, LvColorVariant> = {
  activo: 'success',
  active: 'success',
  aprobado: 'success',
  completado: 'success',

  inactivo: 'neutral',
  inactive: 'neutral',
  borrador: 'neutral',

  pendiente: 'warning',
  pending: 'warning',
  'en proceso': 'warning',

  cancelado: 'danger',
  rechazado: 'danger',
  error: 'danger',

  info: 'info',
  nuevo: 'info',
};

@Pipe({
  name: 'lvStatusColor',
  standalone: true,
})
export class LvStatusColorPipe implements PipeTransform {
  transform(value: string | null | undefined, fallback: LvColorVariant = 'neutral'): LvColorVariant {
    if (!value) return fallback;
    const key = value.toString().trim().toLowerCase();
    return STATUS_COLOR_MAP[key] ?? fallback;
  }
}