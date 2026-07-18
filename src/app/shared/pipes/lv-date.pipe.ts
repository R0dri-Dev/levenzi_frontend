import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'lvDate',
    standalone: true,
})
export class LvDatePipe implements PipeTransform {
    transform(value: string | Date | null | undefined, includeTime = false): string {
        if (!value) return '—';
        const date = value instanceof Date ? value : new Date(value);
        if (isNaN(date.getTime())) return '—';

        const opts: Intl.DateTimeFormatOptions = includeTime
            ? { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
            : { day: '2-digit', month: 'short', year: 'numeric' };

        return new Intl.DateTimeFormat('es-PE', opts).format(date);
    }
}