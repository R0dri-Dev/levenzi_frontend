import { Pipe, PipeTransform } from '@angular/core';
import { formatDecimal } from '../utils/format-number.util';

@Pipe({
    name: 'lvDecimal',
    standalone: true,
})
export class LvDecimalPipe implements PipeTransform {
    transform(value: string | number | null | undefined, maxDecimals = 10): string {
        return formatDecimal(value, maxDecimals);
    }
}