import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Instalacion } from '../../../../core/models/instalacion.model';
import { InstalacionService } from '../../../../core/services/instalaciones/instalacion.service';
import { SedeService } from '../../../../core/services/sede/sede.service';

import type { LvFieldOption, LvFormFieldConfig } from '../../../../shared/types/form-field.type';

import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';

import { ChangeDetectionStrategy } from '@angular/core';
import { LvButtonComponent } from "../../../../shared/ui/atoms";

@Component({
  selector: 'app-edit-instalacion',
  standalone: true,
  imports: [LvPageHeaderComponent, LvDynamicFormComponent, LvButtonComponent],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditInstalacion {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(InstalacionService);

  private readonly sedeService = inject(SedeService);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Instalaciones', route: '/instalaciones' },
    { label: 'Editar instalación' },
  ]);

  readonly loading = signal(true);

  private readonly sedeOptions = signal<LvFieldOption[]>([]);

  readonly form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    sede_id: ['', Validators.required],
    tipo: [''],
    activo: [true],
  });

  readonly fields = computed<LvFormFieldConfig[]>(() => [
    {
      key: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
      placeholder: 'Ej. Instalación A',
    },
    {
      key: 'sede_id',
      label: 'Sede',
      type: 'select',
      required: true,
      placeholder: 'Selecciona una sede',
      options: this.sedeOptions(),
    },
    {
      key: 'tipo',
      label: 'Tipo',
      type: 'text',
      required: false,
      placeholder: 'Ej. Interna',
    },
  ]);

  private readonly id = computed(() => {
    const raw = this.route.snapshot.paramMap.get('id');
    return raw ? Number(raw) : NaN;
  });

  constructor() {
    this.loadSedes();
    this.load();
  }

  private loadSedes(): void {
    this.sedeService.list().subscribe({
      next: (response) => {
        this.sedeOptions.set(
          response.data.map((sede) => ({
            label: sede.nombre,
            value: String(sede.id),
          }))
        );
      },
      error: () => { },
    });
  }

  private load(): void {
    const id = this.id();
    if (!Number.isFinite(id) || id <= 0) {
      this.loading.set(false);
      return;
    }

    this.loading.set(true);

    this.service.list(1).subscribe({
      next: (response) => {
        const instalacion: Instalacion | undefined = response.data.find((i) => i.id === id);
        if (!instalacion) {
          this.loading.set(false);
          return;
        }

        this.form.patchValue({
          nombre: instalacion.nombre ?? '',
          sede_id: String(instalacion.sede_id ?? ''),
          tipo: instalacion.tipo ?? '',
          activo: !!instalacion.activo,
        });
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }


  onCancel(): void {
    void this.router.navigateByUrl('/instalaciones');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const payload: Partial<Instalacion> = {
      nombre: value.nombre,
      sede_id: Number(value.sede_id),
      tipo: value.tipo || undefined,
      activo: value.activo,
    };

    const id = this.id();
    this.loading.set(true);
    this.service.update(id, payload).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigateByUrl('/instalaciones');
      },
      error: () => {
        this.loading.set(false);
        void this.router.navigateByUrl('/instalaciones');
      },
    });
  }
}

