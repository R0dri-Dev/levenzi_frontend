import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'lvDocumento',
    standalone: true,
})
export class LvDocumentoPipe implements PipeTransform {
    transform(value: string | null | undefined, tipo?: 'DNI' | 'RUC'): string {
        if (!value) return '—';
        const clean = value.replace(/\D/g, '');

        const resolvedTipo = tipo ?? (clean.length === 11 ? 'RUC' : 'DNI');

        if (resolvedTipo === 'RUC' && clean.length === 11) {
            return `${clean.slice(0, 2)}-${clean.slice(2, 10)}-${clean.slice(10)}`;
        }

        return clean;
    }
}