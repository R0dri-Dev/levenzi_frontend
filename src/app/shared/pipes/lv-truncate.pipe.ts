import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lvTruncate',
  standalone: true,
})
export class LvTruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, limit = 60, suffix = '…'): string {
    if (!value) return '—';
    return value.length > limit ? `${value.slice(0, limit).trimEnd()}${suffix}` : value;
  }
}