import { Component, forwardRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { LvSelectComponent } from '../../atoms/select/select';
import { UbicacionService } from '../../../../core/services/ubicacion/ubicacion.service';
import { Departamento } from '../../../../core/models/departamento.model';
import { Provincia } from '../../../../core/models/provincia.model';
import { Distrito } from '../../../../core/models/distrito.model';
import { Option } from '../../../interfaces/option.interface';

@Component({
  selector: 'lv-location-select',
  standalone: true,
  imports: [CommonModule, LvSelectComponent],
  templateUrl: './location-select.html',
  styleUrls: ['./location-select.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LvLocationSelectComponent),
      multi: true,
    },
  ],
})
export class LvLocationSelectComponent implements ControlValueAccessor {
  private readonly ubicacionService = inject(UbicacionService);

  readonly departamentos = signal<Departamento[]>([]);
  readonly provincias = signal<Provincia[]>([]);
  readonly distritos = signal<Distrito[]>([]);

  readonly departamentoValue = signal<string | number>('');
  readonly provinciaValue = signal<string | number>('');
  readonly distritoValue = signal<string | number>('');

  readonly disabled = signal(false);

  private onChange: (value: number | null) => void = () => { };
  private onTouched: () => void = () => { };

  constructor() {
    this.ubicacionService.listarDepartamentos().subscribe({
      next: (data) => this.departamentos.set(data),
    });
  }

  get departamentoOptions(): Option[] {
    return this.departamentos().map((d) => ({ value: d.id, label: d.nombre }));
  }

  get provinciaOptions(): Option[] {
    return this.provincias().map((p) => ({ value: p.id, label: p.nombre }));
  }

  get distritoOptions(): Option[] {
    return this.distritos().map((d) => ({ value: d.id, label: d.nombre }));
  }

  onDepartamentoChange(value: string | number): void {
    this.departamentoValue.set(value);
    this.provinciaValue.set('');
    this.distritoValue.set('');
    this.provincias.set([]);
    this.distritos.set([]);

    this.emitValue(null);

    if (value !== '') {
      this.ubicacionService.listarProvincias(Number(value)).subscribe({
        next: (data) => this.provincias.set(data),
      });
    }
  }

  onProvinciaChange(value: string | number): void {
    this.provinciaValue.set(value);
    this.distritoValue.set('');
    this.distritos.set([]);

    this.emitValue(null);

    if (value !== '') {
      this.ubicacionService.listarDistritos(Number(value)).subscribe({
        next: (data) => this.distritos.set(data),
      });
    }
  }

  onDistritoChange(value: string | number): void {
    this.distritoValue.set(value);
    this.emitValue(value === '' ? null : Number(value));
  }

  private emitValue(value: number | null): void {
    this.onChange(value);
    this.onTouched();
  }

  // --- ControlValueAccessor ---

  writeValue(value: number | null): void {
    this.distritoValue.set(value ?? '');
    if (value) {
      this.resolveChainFromDistrito(value);
    }
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  private resolveChainFromDistrito(distritoId: number): void {
    this.ubicacionService.obtenerDistrito(distritoId).subscribe({
      next: (distrito) => {
        const provincia = distrito.provincia;
        const departamento = provincia.departamento;

        this.departamentoValue.set(departamento.id);

        this.ubicacionService.listarProvincias(departamento.id).subscribe({
          next: (provincias) => {
            this.provincias.set(provincias);
            this.provinciaValue.set(provincia.id);

            this.ubicacionService.listarDistritos(provincia.id).subscribe({
              next: (distritos) => {
                this.distritos.set(distritos);
                this.distritoValue.set(distritoId);
              },
            });
          },
        });
      },
      error: () => {
        // Si el distrito ya no existe o falla la carga, no rompemos el form
      },
    });
  }
}
