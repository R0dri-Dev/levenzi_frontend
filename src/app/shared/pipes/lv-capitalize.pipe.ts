import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'lvCapitalize',
    standalone: true,
})
export class LvCapitalizePipe implements PipeTransform {
    transform(value: string | null | undefined, everyWord = false): string {
        if (!value) return '';

        if (!everyWord) {
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }

        return value
            .toLowerCase()
            .split(' ')
            .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : word))
            .join(' ');
    }
}