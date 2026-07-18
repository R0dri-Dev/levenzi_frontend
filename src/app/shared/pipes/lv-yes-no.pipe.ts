import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'lvYesNo',
    standalone: true,
})
export class LvYesNoPipe implements PipeTransform {
    transform(value: boolean | number | null | undefined, trueLabel = 'Sí', falseLabel = 'No'): string {
        return value ? trueLabel : falseLabel;
    }
}