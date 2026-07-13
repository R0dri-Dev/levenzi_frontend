import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Instalacion } from '../../../../core/models/instalacion.model';
import { InstalacionService } from '../../../../core/services/instalaciones/instalacion.service';

import type { LvFieldOption } from '../../../../shared/types/form-field.type';


import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';


import { SedeService } from '../../../../core/services/sede/sede.service';

import { FormBuilder, Validators } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-detail-instalacion',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDetailListComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailInstalacion {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(InstalacionService);
  private readonly fb = inject(FormBuilder);

  private readonly sedeService = inject(SedeService);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Instalaciones', route: '/instalaciones' },
    { label: 'Detalle instalación' },
  ]);

  readonly loading = signal(true);

  private readonly sedeOptions = signal<LvFieldOption[]>([]);

  readonly id = computed(() => {
    const raw = this.route.snapshot.paramMap.get('id');
    return raw ? Number(raw) : NaN;
  });

  readonly instalacion = signal<Instalacion | null>(null);

  readonly items = computed(() => {
    const instalacion = this.instalacion();
    if (!instalacion) return [];

    return [
      { label: 'ID', value: instalacion.id },
      { label: 'Nombre', value: instalacion.nombre },
      { label: 'Sede', value: instalacion.sede_id },
      { label: 'Tipo', value: instalacion.tipo ?? 'Sin tipo' },
      { label: 'Estado', value: instalacion.activo ? 'Activo' : 'Inactivo' },
    ];
  });

  readonly form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    sede_id: ['', Validators.required],
    tipo: [''],
    activo: [true],
  });

  readonly fields = computed(() => [
    {
      key: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
      placeholder: 'Ej. Instalación A',
      disabled: true,
    },
    {
      key: 'sede_id',
      label: 'Sede',
      type: 'select',
      required: true,
      placeholder: 'Selecciona una sede',
      options: this.sedeOptions(),
      disabled: true,
    },
    {
      key: 'tipo',
      label: 'Tipo',
      type: 'text',
      required: false,
      placeholder: 'Ej. Interna',
      disabled: true,
    },
  ]);

  constructor() {
    void this.loadSedes();
    void this.load();
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
        const found = response.data.find((i) => i.id === id) ?? null;
        this.instalacion.set(found);

        if (found) {
          this.form.patchValue({
            nombre: found.nombre ?? '',
            sede_id: String(found.sede_id ?? ''),
            tipo: found.tipo ?? '',
            activo: !!found.activo,
          });
        }

        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onCancel(): void {
    void this.router.navigateByUrl('/instalaciones');
  }

  onSubmit(): void {
    // Sin submit: solo detalle
  }
}

