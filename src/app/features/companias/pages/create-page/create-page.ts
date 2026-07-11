import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Compania } from '../../../../core/models/compania.model';
import { CompaniaService } from '../../../../core/services/compania/compania.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvFormFieldComponent } from "../../../../shared/ui/molecules";
import { LvInputComponent } from "../../../../shared/ui/atoms";


@Component({
  selector: 'app-create-compania-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LvPageHeaderComponent, LvButtonComponent, LvFormFieldComponent, LvInputComponent],
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
    nombre: ['', [Validators.required]],
    ruc: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    activo: [true],
  });

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
