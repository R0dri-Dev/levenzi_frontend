import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'lvTelefono',
    standalone: true,
})
export class LvTelefonoPipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (!value) return '—';
        const clean = value.replace(/\D/g, '');

        if (clean.length === 9) {
            return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6)}`;
        }

        if (clean.length === 7) {
            return `${clean.slice(0, 3)}-${clean.slice(3)}`;
        }

        return value;
    }
}