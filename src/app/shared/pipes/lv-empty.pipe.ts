import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'lvEmpty',
    standalone: true,
})
export class LvEmptyPipe implements PipeTransform {
    transform(value: unknown, fallback = '—'): unknown {
        if (value === null || value === undefined) return fallback;
        if (typeof value === 'string' && value.trim() === '') return fallback;
        if (Array.isArray(value) && value.length === 0) return fallback;
        return value;
    }
}