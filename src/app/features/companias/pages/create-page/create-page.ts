import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Compania } from '../../../../core/models/compania.model';
import { CompaniaService } from '../../../../core/services/compania/compania.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvFormFieldConfig } from '../../../../shared/types/form-field.type';
import { LvDynamicFormComponent } from "../../../../shared/ui/organisms/dynamic-form/dynamic-form";
@Component({
  selector: 'app-create-compania-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LvPageHeaderComponent, LvButtonComponent, LvDynamicFormComponent],
  templateUrl: './create-page.html',
})
export class CreateCompaniaPage {
  private readonly router = inject(Router);
  private readonly service = inject(CompaniaService);
  private readonly fb = inject(FormBuilder);


  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Compañías', route: '/companias' },
    { label: 'Crear compañía' },
  ]);

  readonly form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    ruc: ['', Validators.required],
    direccion: ['', Validators.required],
    activo: true,
  });

  readonly fields: LvFormFieldConfig[] = [
    {
      key: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
      placeholder: 'Ej. Compañía ABC',
    },
    {
      key: 'ruc',
      label: 'RUC',
      type: 'text',
      required: true,
      placeholder: 'Ej. 20123456789',
    },
    {
      key: 'direccion',
      label: 'Dirección',
      type: 'text',
      required: true,
      placeholder: 'Ej. Av. Siempre Viva 742',
    },
    {
      key: 'activo',
      label: 'Activo',
      type: 'checkbox',
      hint: 'La compañía estará habilitada para utilizarse en el sistema.',
    },
  ];

  onCancel(): void {
    void this.router.navigateByUrl('/companias');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Partial<Compania> = this.form.getRawValue();
    this.handleCreateSubmit(payload);
  }

  handleCreateSubmit(payload: Partial<Compania>): void {
    this.service.create(payload).subscribe({
      next: () => void this.router.navigateByUrl('/companias'),
      error: () => void this.router.navigateByUrl('/companias'),
    });
  }
}
