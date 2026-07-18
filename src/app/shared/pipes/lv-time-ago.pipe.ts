import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'lvTimeAgo',
    standalone: true,
})
export class LvTimeAgoPipe implements PipeTransform {
    transform(value: string | Date | null | undefined): string {
        if (!value) return '—';
        const date = value instanceof Date ? value : new Date(value);
        if (isNaN(date.getTime())) return '—';

        const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
        if (seconds < 60) return 'hace un momento';

        const units: [number, string][] = [
            [31536000, 'año'],
            [2592000, 'mes'],
            [604800, 'semana'],
            [86400, 'día'],
            [3600, 'hora'],
            [60, 'minuto'],
        ];

        for (const [secondsInUnit, label] of units) {
            const count = Math.floor(seconds / secondsInUnit);
            if (count >= 1) {
                return `hace ${count} ${label}${count > 1 ? 's' : ''}`;
            }
        }

        return 'hace un momento';
    }
}