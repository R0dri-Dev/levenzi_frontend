import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvFormFieldConfig } from '../../../../shared/types/form-field.type';
import { User } from '../../../../core/models/user.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms';
import { UserService } from '../../../../core/services/Usuarios/user.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LvDynamicFormComponent,
    LvPageHeaderComponent,
    LvButtonComponent
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class EditUser {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(UserService);
  private readonly fb = inject(FormBuilder);

  readonly usuario = signal<User | null>(null);
  readonly loading = signal(true);
  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Usuarios', route: '/usuarios' },
    { label: 'Editar usuario' },
  ]);

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
      label: 'Nueva contraseña',
      placeholder: 'Dejar vacío para no cambiar',
      required: false,
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

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    telefono: [''],
    activo: [true],
  });

  constructor() {
    effect(() => {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (!id) {
        void this.router.navigateByUrl('/usuarios');
        return;
      }

      this.loading.set(true);
      this.service.get(id).subscribe({
        next: (usuario: User) => {
          this.usuario.set(usuario);
          this.form.patchValue({
            name: usuario.name ?? '',
            email: usuario.email ?? '',
            password: '',
            telefono: usuario.telefono ?? '',
            activo: !!usuario.activo,
          });
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          void this.router.navigateByUrl('/usuarios');
        },
      });
    });
  }

  onCancel(): void {
    void this.router.navigateByUrl('/usuarios');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const usuario = this.usuario();
    if (!usuario?.id) {
      void this.router.navigateByUrl('/usuarios');
      return;
    }

    this.loading.set(true);
    const raw = this.form.getRawValue();

    const payload: Partial<User> = {
      name: raw.name ?? '',
      email: raw.email ?? '',
      telefono: raw.telefono ?? undefined,
      activo: raw.activo ?? true,
    };

    if (raw.password) {
      payload.password = raw.password;
    }

    this.service.update(usuario.id, payload).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigateByUrl('/usuarios');
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
