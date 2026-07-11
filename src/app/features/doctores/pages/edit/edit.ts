import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Doctor } from '../../../../core/models/doctor.model';
import { SedeService } from '../../../../core/services/sede/sede.service';
import { Sede } from '../../../../core/models/sede.model';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvFormFieldConfig } from '../../../../shared/types/form-field.type';


@Component({
  selector: 'app-edit-doctor',
  standalone: true,
  imports: [ReactiveFormsModule, LvPageHeaderComponent, LvDynamicFormComponent],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class EditDoctor {
  private readonly sedeService = inject(SedeService);

  readonly doctor = input<Doctor | null>(null);
  readonly submit = output<Partial<Doctor>>();
  readonly cancel = output<void>();

  readonly fields = signal<LvFormFieldConfig[]>([
    { key: 'nombre', type: 'text', label: 'Nombre', placeholder: 'Ej. Dr. Juan Pérez', required: true, hint: '' },
    {
      key: 'sede_id',
      type: 'select',
      label: 'Sede',
      placeholder: 'Selecciona una sede',
      required: true,
      options: [
        { label: 'Sede Central', value: 1 },
        { label: 'Sede Norte', value: 2 },
      ],
    },
    { key: 'cmp', type: 'text', label: 'CMP', placeholder: 'Ej. 123456', required: false },
    { key: 'especialidad', type: 'text', label: 'Especialidad', placeholder: 'Ej. Dermatología', required: false },
    { key: 'telefono', type: 'tel', label: 'Teléfono', placeholder: '987654321', required: false },
    { key: 'email', type: 'email', label: 'Correo', placeholder: 'doctor@mail.com', required: false },
  ]);

  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    effect(() => {
      this.sedeService.list(1).subscribe({
        next: (res) => {
          const sedes = res.data;
          const sedeOptions = sedes.map((s: Sede) => ({ label: s.nombre, value: s.id }));
          this.fields.set(
            this.fields().map((f) =>
              f.key === 'sede_id'
                ? {
                  ...f,
                  options: sedeOptions,
                }
                : f,
            ),
          );
        },
      });
    });

    this.form = this.fb.group({
      sede_id: [null, [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      cmp: [''],
      especialidad: [''],
      telefono: [''],
      email: ['', [Validators.email]],
      activo: [true],
    });

    effect(() => {
      const doctor = this.doctor();
      if (doctor) {
        queueMicrotask(() => {
          this.form.patchValue(
            {
              sede_id: doctor.sede_id ?? null,
              nombre: doctor.nombre ?? '',
              cmp: doctor.cmp ?? '',
              especialidad: doctor.especialidad ?? '',
              telefono: doctor.telefono ?? '',
              email: doctor.email ?? '',
              activo: !!doctor.activo,
            },
            { emitEvent: false },
          );
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();
    this.submit.emit({
      sede_id: Number(payload.sede_id),
      nombre: payload.nombre,
      cmp: payload.cmp || undefined,
      especialidad: payload.especialidad || undefined,
      telefono: payload.telefono || undefined,
      email: payload.email || undefined,
      activo: payload.activo,
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

