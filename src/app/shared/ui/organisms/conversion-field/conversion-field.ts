import { Component, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LvInputComponent } from '../../atoms/input/input';
import { LvIconComponent } from '../../icons/icon/icon';

@Component({
    selector: 'lv-conversion-field',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, LvInputComponent, LvIconComponent],
    templateUrl: './conversion-field.html',
    styleUrls: ['./conversion-field.css'],
})
export class LvConversionFieldComponent {
    readonly valueControl = input.required<FormControl>();
    readonly baseLabel = input<string>('');
    readonly unitSymbol = input<string>('');
    readonly label = input<string>('Equivale a');
    readonly required = input(false);
    readonly disabled = input(false);

    // Control interno, solo de presentación, para el lado "unidad base" (siempre readonly/disabled)
    readonly baseControl = new FormControl({ value: '', disabled: true });

    constructor() {
        effect(() => {
            this.baseControl.setValue(this.baseLabel() || 'Selecciona un tipo primero');
        });
    }
}