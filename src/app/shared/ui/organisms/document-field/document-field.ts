import { Component, computed, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { finalize, switchMap, startWith } from 'rxjs';

import { LvLabelComponent } from '../../atoms/label/label';
import { LvSelectComponent } from '../../atoms/select/select';
import { LvInputComponent } from '../../atoms/input/input';
import { LvButtonComponent } from '../../atoms/button/button';
import { Option } from '../../../interfaces/option.interface';
import { DecolectaService } from '../../../../core/services/documentos/decolecta.service';
import { ConsultaDni, ConsultaRuc } from '../../../../core/models/consulta-documento.model';
import { formatNombreDni, formatRazonSocialRuc } from '../../../../core/utils/documento-format.util';

export interface LvDocumentoOption extends Option {
  codigo?: 'DNI' | 'RUC' | string;
}

export type LvDocumentLookupResult =
  | { tipo: 'DNI'; data: ConsultaDni; nombreSugerido: string }
  | { tipo: 'RUC'; data: ConsultaRuc; nombreSugerido: string; direccionSugerida?: string };

@Component({
  selector: 'lv-document-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LvLabelComponent,
    LvSelectComponent,
    LvInputComponent,
    LvButtonComponent,
  ],
  templateUrl: './document-field.html',
  styleUrls: ['./document-field.css'],
})
export class LvDocumentFieldComponent {
  private readonly decolecta = inject(DecolectaService);

  readonly tipoControl = input.required<FormControl<string>>();
  readonly numeroControl = input.required<FormControl<string>>();
  readonly tipoOptions = input<LvDocumentoOption[]>([]);
  readonly tipoLabel = input<string>('Tipo de documento');
  readonly numeroLabel = input<string>('Número de documento');
  readonly numeroPlaceholder = input<string>('');
  readonly required = input(false);

  readonly enableLookup = input(false);

  readonly resolved = output<LvDocumentLookupResult>();
  readonly notFound = output<void>();

  readonly loading = signal(false);
  readonly errorMsg = signal<string | null>(null);

  private readonly tipoValue = toSignal(
    toObservable(this.tipoControl).pipe(
      switchMap((control) => control.valueChanges.pipe(startWith(control.value)))
    ),
    { initialValue: '' as string }
  );

  private readonly numeroValue = toSignal(
    toObservable(this.numeroControl).pipe(
      switchMap((control) => control.valueChanges.pipe(startWith(control.value)))
    ),
    { initialValue: '' as string }
  );

  readonly tipoActual = computed(() => {
    const id = this.tipoValue();
    const idStr = id == null ? '' : String(id);
    return this.tipoOptions().find((o) => String(o.value) === idStr) ?? null;
  });

  readonly largoEsperado = computed(() => {
    const codigo = this.tipoActual()?.codigo;
    if (codigo === 'DNI') return 8;
    if (codigo === 'RUC') return 11;
    return null;
  });

  readonly puedeBuscar = computed(() => {
    if (!this.enableLookup()) return false;

    const numero = this.numeroValue() ?? '';
    const largo = this.largoEsperado();

    return !!largo && numero.length === largo && !this.loading();
  });

  buscar(): void {
    const tipo = this.tipoActual();
    const numero = this.numeroControl()?.value;
    if (!this.enableLookup() || !tipo?.codigo || !numero || !this.puedeBuscar()) return;

    this.loading.set(true);
    this.errorMsg.set(null);

    const onError = () => {
      this.errorMsg.set(`No se encontró el ${tipo.codigo}.`);
      this.numeroControl().setErrors({ notFound: true });
      this.notFound.emit();
    };

    if (tipo.codigo === 'DNI') {
      this.decolecta.consultarDni(numero)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
          next: (data) => this.resolved.emit({
            tipo: 'DNI',
            data,
            nombreSugerido: formatNombreDni(data),
          }),
          error: onError,
        });
    } else if (tipo.codigo === 'RUC') {
      this.decolecta.consultarRuc(numero)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
          next: (data) => this.resolved.emit({
            tipo: 'RUC',
            data,
            nombreSugerido: formatRazonSocialRuc(data),
            direccionSugerida: data.direccion,
          }),
          error: onError,
        });
    } else {
      this.loading.set(false);
    }
  }
}
