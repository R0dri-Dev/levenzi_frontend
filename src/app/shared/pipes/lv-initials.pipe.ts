import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'lvInitials',
    standalone: true,
})
export class LvInitialsPipe implements PipeTransform {
    transform(value: string | null | undefined, maxLetters = 2): string {
        if (!value) return '';
        return value
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, maxLetters)
            .map((word) => word.charAt(0).toUpperCase())
            .join('');
    }
}