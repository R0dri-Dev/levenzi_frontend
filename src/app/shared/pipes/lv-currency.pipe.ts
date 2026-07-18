import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lvCurrency',
  standalone: true,
})
export class LvCurrencyPipe implements PipeTransform {
  transform(value: string | number | null | undefined, currency = 'PEN'): string {
    if (value === null || value === undefined || value === '') return '—';
    const num = Number(value);
    if (!Number.isFinite(num)) return '—';
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency }).format(num);
  }
}