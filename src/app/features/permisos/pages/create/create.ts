import { Component, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvInputComponent } from '../../../../shared/ui/atoms/input/input';
import { LvSelectComponent } from '../../../../shared/ui/atoms/select/select';
import { LvFormFieldComponent } from '../../../../shared/ui/molecules/form-field/form-field';
import { PermisoService } from '../../../../core/services/permiso/permiso.service';
import { Option } from '../../../../shared/interfaces/option.interface';
import { Modulo } from '../../../../core/models/modulo.model';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, LvInputComponent, LvButtonComponent, LvFormFieldComponent, LvSelectComponent],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class Create {
  readonly submit = output<{ name: string; guard_name: string; modulo_id?: number }>();
  readonly cancel = output<void>();

  form: FormGroup;
  readonly modulos = signal<Option[]>([]);

  constructor(private readonly fb: FormBuilder, private readonly permisoService: PermisoService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      guard_name: ['api', [Validators.required]],
      modulo_id: [null],
    });

    this.loadModulos();
  }

  private loadModulos(): void {
    this.permisoService.listModulos().subscribe({
      next: (data: Modulo[]) => {
        this.modulos.set(data.map((item) => ({ label: item.nombre, value: item.id })));
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();
    this.submit.emit({
      name: payload.name,
      guard_name: 'api',
      modulo_id: payload.modulo_id ? Number(payload.modulo_id) : undefined,
    });
    this.form.reset({ name: '', guard_name: 'api', modulo_id: null });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
