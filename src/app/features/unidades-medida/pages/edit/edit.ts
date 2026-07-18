import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UnidadMedida } from '../../../../core/models/unidad-medida.model';
import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import type { LvFormFieldConfig } from '../../../../shared/types/form-field.type';
import { LvButtonComponent } from '../../../../shared/ui/atoms';
import { UnidadMedidaService } from '../../../../core/services/unidades-medida/unidades-medida.service';
import { TipoUnidadMedidaService } from '../../../../core/services/tipos-unidad-medida/tipos-unidad-medida.service';

@Component({
  selector: 'app-edit-unidad-medida',
  standalone: true,
  imports: [LvPageHeaderComponent, LvDynamicFormComponent, LvButtonComponent],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class EditUnidadMedida {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(UnidadMedidaService);
  private readonly tipoService = inject(TipoUnidadMedidaService);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Unidades de medida', route: '/unidades-medida' },
    { label: 'Editar unidad' },
  ]);

  readonly loading = signal(false);

  readonly id = computed(() => {
    const raw = this.route.snapshot.paramMap.get('id');
    return raw ? Number(raw) : NaN;
  });

  readonly tipoOptions = signal<{ label: string; value: string }[]>([]);

  // Unidad base existente para el tipo seleccionado (excluyendo la unidad actual)
  private readonly unidadBase = signal<UnidadMedida | null>(null);
  private readonly simboloValue = signal('');
  private readonly baseChecked = signal(false);

  readonly existeOtraBaseParaTipo = computed(() => !!this.unidadBase());

  readonly form = this.fb.nonNullable.group({
    tipo_unidad_medida_id: ['', Validators.required],
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    simbolo: ['', Validators.required],
    factor_base: ['', Validators.required],
    base: [false],
    conversion: [true],
    activo: [true],
  });

  readonly fields = computed((): LvFormFieldConfig[] => {
    const hayOtraBase = this.existeOtraBaseParaTipo();
    const esBase = this.baseChecked();

    return [
      {
        key: 'tipo_unidad_medida_id',
        label: 'Tipo de unidad',
        type: 'select',
        required: true,
        placeholder: 'Selecciona un tipo',
        options: this.tipoOptions(),
      },
      {
        key: 'nombre',
        label: 'Nombre',
        type: 'text',
        required: true,
        placeholder: 'Ej. Kilogramo',
      },
      {
        key: 'simbolo',
        label: 'Símbolo',
        type: 'text',
        required: true,
        placeholder: 'Ej. kg',
      },
      hayOtraBase && !esBase
        ? {
          key: 'factor_base',
          label: 'Equivale a',
          type: 'conversion',
          required: true,
          baseLabel: `1 ${this.unidadBase()!.nombre} (${this.unidadBase()!.simbolo})`,
          unitSymbol: this.simboloValue() || undefined,
        }
        : {
          key: 'factor_base',
          label: 'Factor base',
          type: 'number',
          required: true,
          disabled: esBase,
          placeholder: esBase ? '1' : 'Ej. 1000',
          hint: esBase
            ? 'Al ser la unidad base, el factor es 1.'
            : 'Equivalencia respecto a la unidad base de este tipo.',
        },
      {
        key: 'base',
        label: '¿Es la unidad base de este tipo?',
        type: 'checkbox',
        required: false,
        disabled: hayOtraBase,
        hint: hayOtraBase ? `Este tipo ya tiene una unidad base: ${this.unidadBase()!.nombre}.` : undefined,
      },
      {
        key: 'conversion',
        label: '¿Permite conversión?',
        type: 'checkbox',
        required: false,
      },
    ];
  });

  constructor() {
    this.loadTipos();
    this.loadUnidad();

    this.form.get('simbolo')!.valueChanges.subscribe((v) => this.simboloValue.set(v ?? ''));
    this.form.get('base')!.valueChanges.subscribe((v) => this.baseChecked.set(!!v));

    this.form.get('tipo_unidad_medida_id')!.valueChanges.subscribe((tipoId) => {
      this.checkBaseParaTipo(tipoId);
    });

    effect(() => {
      const control = this.form.get('base')!;
      if (this.existeOtraBaseParaTipo()) {
        control.disable({ emitEvent: false });
      } else {
        control.enable({ emitEvent: false });
      }
    });
  }

  private checkBaseParaTipo(tipoId: string | null): void {
    this.unidadBase.set(null);

    if (!tipoId) return;

    const currentId = this.id();

    this.service.list(1, { tipo_unidad_medida_id: Number(tipoId), per_page: 100 }).subscribe({
      next: (res) => {
        const base = res.data.find((u) => u.base && u.id !== currentId);
        this.unidadBase.set(base ?? null);
      },
    });
  }

  private loadTipos(): void {
    this.tipoService.list().subscribe({
      next: (response) => {
        this.tipoOptions.set(
          response.data.map((t) => ({
            label: t.nombre,
            value: String(t.id),
          })),
        );
      },
    });
  }

  private loadUnidad(): void {
    const id = this.id();
    if (!Number.isFinite(id) || id <= 0) return;

    this.loading.set(true);
    this.service.getById(id).subscribe({
      next: (found) => {
        this.form.patchValue({
          tipo_unidad_medida_id: String(found.tipo_unidad_medida_id ?? ''),
          nombre: found.nombre ?? '',
          simbolo: found.simbolo ?? '',
          factor_base: String(found.factor_base ?? ''),
          base: !!found.base,
          conversion: !!found.conversion,
          activo: !!found.activo,
        });
        this.baseChecked.set(!!found.base);
        this.loading.set(false);

        this.checkBaseParaTipo(String(found.tipo_unidad_medida_id ?? ''));
      },
      error: () => this.loading.set(false),
    });
  }

  onCancel(): void {
    void this.router.navigate(['/unidades-medida']);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const id = this.id();
    if (!Number.isFinite(id) || id <= 0) return;

    this.loading.set(true);
    const value = this.form.getRawValue();

    const payload: Partial<UnidadMedida> = {
      ...value,
      tipo_unidad_medida_id: Number(value.tipo_unidad_medida_id),
      factor_base: String(Number(value.factor_base)),
      activo: !!value.activo,
    };

    this.service.update(id, payload).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigate(['/unidades-medida']);
      },
      error: () => {
        this.loading.set(false);
        void this.router.navigate(['/unidades-medida']);
      },
    });
  }
}