import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvFormFieldConfig } from '../../../../shared/types/form-field.type';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { UserService } from '../../../../core/services/Usuarios/user.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, LvPageHeaderComponent, LvDynamicFormComponent, LvButtonComponent],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class CreateUser {
  private readonly router = inject(Router);
  private readonly service = inject(UserService);
  private readonly fb = inject(FormBuilder);

  readonly loading = signal(false);
  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Usuarios', route: '/usuarios' },
    { label: 'Nuevo usuario' },
  ]);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    telefono: [''],
    activo: [true],
  });

  readonly fields: LvFormFieldConfig[] = [
    {
      key: 'name',
      type: 'text',
      label: 'Nombre',
      placeholder: 'Ej. Juan Pérez',
      required: true,
    },
    {
      key: 'email',
      type: 'email',
      label: 'Correo',
      placeholder: 'correo@empresa.com',
      required: true,
    },
    {
      key: 'password',
      type: 'password',
      label: 'Contraseña',
      placeholder: 'Mínimo 6 caracteres',
      required: true,
    },
    {
      key: 'telefono',
      type: 'tel',
      label: 'Teléfono',
      placeholder: '987654321',
      required: false,
    },
    {
      key: 'activo',
      type: 'checkbox',
      label: 'Activo',
      required: false,
    },
  ];

  onCancel(): void {
    void this.router.navigateByUrl('/usuarios');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const payload = this.form.getRawValue();

    this.service.create(payload).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigateByUrl('/usuarios');
      },
      error: () => {
        this.loading.set(false);
        // Aquí puedes manejar el error con un toast o mensaje
      },
    });
  }
}
