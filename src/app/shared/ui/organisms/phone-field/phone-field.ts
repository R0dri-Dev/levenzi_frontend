import { Component, computed, input } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { switchMap, startWith } from 'rxjs';

import { LvLabelComponent } from '../../atoms/label/label';
import { LvSelectComponent } from '../../atoms/select/select';
import { LvInputComponent } from '../../atoms/input/input';
import { Option } from '../../../interfaces/option.interface';
import { Pais } from '../../../../core/models/pais.model';

@Component({
  selector: 'lv-phone-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LvLabelComponent, LvSelectComponent, LvInputComponent],
  templateUrl: './phone-field.html',
  styleUrls: ['./phone-field.css'],
})
export class LvPhoneFieldComponent {
  readonly paisControl = input.required<FormControl<string>>();
  readonly numeroControl = input.required<FormControl<string>>();
  readonly paises = input<Pais[]>([]);
  readonly label = input<string>('Teléfono');
  readonly numeroPlaceholder = input<string>('');
  readonly required = input(false);

  // Se actualiza en cada cambio de valor del control (sin invocar el input eagerly)
  private readonly paisValue = toSignal(
    toObservable(this.paisControl).pipe(
      switchMap((control) => control.valueChanges.pipe(startWith(control.value)))
    )
  );

  readonly paisOptions = computed<Option[]>(() =>
    this.paises().map((p) => ({
      value: p.id,
      label: p.codigo_telefono,
      flag: p.codigo_iso2.toLowerCase(),
    }))
  );

  readonly paisActual = computed<Pais | undefined>(() =>
    this.paises().find((p) => String(p.id) === String(this.paisValue()))
  );

  readonly hint = computed<string>(() => {
    const pais = this.paisActual();
    if (!pais) return '';
    return pais.longitud_min === pais.longitud_max
      ? `${pais.longitud_min} dígitos`
      : `${pais.longitud_min}-${pais.longitud_max} dígitos`;
  });

  readonly maxLength = computed<number | null>(() => this.paisActual()?.longitud_max ?? null);
}
