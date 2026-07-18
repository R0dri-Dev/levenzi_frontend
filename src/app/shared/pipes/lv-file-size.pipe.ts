import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'lvFileSize',
    standalone: true,
})
export class LvFileSizePipe implements PipeTransform {
    transform(bytes: number | null | undefined): string {
        if (!bytes || bytes <= 0) return '0 B';

        const units = ['B', 'KB', 'MB', 'GB'];
        const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
        const size = bytes / Math.pow(1024, exponent);

        return `${size.toFixed(exponent === 0 ? 0 : 1)} ${units[exponent]}`;
    }
}