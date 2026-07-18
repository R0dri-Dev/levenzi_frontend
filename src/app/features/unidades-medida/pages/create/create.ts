import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import type { LvFormFieldConfig } from '../../../../shared/types/form-field.type';
import { UnidadMedida } from '../../../../core/models/unidad-medida.model';
import { UnidadMedidaService } from '../../../../core/services/unidades-medida/unidades-medida.service';
import { TipoUnidadMedidaService } from '../../../../core/services/tipos-unidad-medida/tipos-unidad-medida.service';

@Component({
  selector: 'app-create-unidad-medida',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDynamicFormComponent],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class CreateUnidadMedida {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(UnidadMedidaService);
  private readonly tipoService = inject(TipoUnidadMedidaService);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Unidades de medida', route: '/unidades-medida' },
    { label: 'Nueva unidad' },
  ]);

  readonly loading = signal(false);
  readonly tipoOptions = signal<{ label: string; value: string }[]>([]);

  private readonly unidadBase = signal<UnidadMedida | null>(null);
  private readonly checkingBase = signal(false);

  private readonly simboloValue = signal('');
  private readonly baseChecked = signal(false);

  readonly existeBaseParaTipo = computed(() => !!this.unidadBase());

  readonly form = this.fb.nonNullable.group({
    tipo_unidad_medida_id: ['', Validators.required],
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    simbolo: ['', Validators.required],
    factor_base: ['', Validators.required],
    base: [false],
    conversion: [true],
  });

  readonly fields = computed((): LvFormFieldConfig[] => {
    const hayBase = this.existeBaseParaTipo();
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
      hayBase
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
          type: 'text',
          required: true,
          disabled: esBase,
          placeholder: esBase ? '1' : 'Ej. 1000',
          hint: esBase
            ? 'Al ser la unidad base, el factor es 1.'
            : 'Aún no hay una unidad base para este tipo. Si esta no es la base, ingresa manualmente su equivalencia cuando la base exista.',
        },
      {
        key: 'base',
        label: '¿Es la unidad base de este tipo?',
        type: 'checkbox',
        required: false,
        disabled: hayBase,
        hint: hayBase ? `Este tipo ya tiene una unidad base: ${this.unidadBase()!.nombre}.` : undefined,
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

    this.form.get('simbolo')!.valueChanges.subscribe((v) => this.simboloValue.set(v ?? ''));
    this.form.get('base')!.valueChanges.subscribe((v) => this.baseChecked.set(!!v));

    this.form.get('tipo_unidad_medida_id')!.valueChanges.subscribe((tipoId) => {
      this.checkBaseParaTipo(tipoId);
    });

    effect(() => {
      if (this.baseChecked() && !this.existeBaseParaTipo()) {
        this.form.patchValue({ factor_base: '1' }, { emitEvent: false });
      }
    });

    effect(() => {
      const control = this.form.get('base')!;
      if (this.existeBaseParaTipo()) {
        control.disable({ emitEvent: false });
      } else {
        control.enable({ emitEvent: false });
      }
    });
  }

  private checkBaseParaTipo(tipoId: string | null): void {
    this.unidadBase.set(null);
    this.form.patchValue({ base: false }, { emitEvent: false });
    this.baseChecked.set(false);

    if (!tipoId) return;

    this.checkingBase.set(true);
    this.service.list(1, { tipo_unidad_medida_id: Number(tipoId), per_page: 100 }).subscribe({
      next: (res) => {
        const base = res.data.find((u) => u.base);
        this.unidadBase.set(base ?? null);
        this.checkingBase.set(false);

        if (base) {
          this.form.patchValue({ base: false, factor_base: '' }, { emitEvent: false });
        }
      },
      error: () => this.checkingBase.set(false),
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

  onCancel(): void {
    void this.router.navigate(['/unidades-medida']);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const value = this.form.getRawValue();

    const payload = {
      ...value,
      tipo_unidad_medida_id: Number(value.tipo_unidad_medida_id),
      factor_base: String(Number(value.factor_base)),
      activo: true,
    };

    this.service.create(payload).subscribe({
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