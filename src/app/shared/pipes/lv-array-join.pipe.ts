import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'lvArrayJoin',
    standalone: true,
})
export class LvArrayJoinPipe implements PipeTransform {
    transform(value: unknown[] | null | undefined, separator = ', ', fallback = '—'): string {
        if (!value || value.length === 0) return fallback;
        return value.join(separator);
    }
}