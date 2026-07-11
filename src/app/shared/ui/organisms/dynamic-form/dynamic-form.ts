import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LvFormTemplateComponent } from '../../templates/form-template/form-template';
import { LvInputComponent } from '../../atoms/input/input';
import { LvCheckboxComponent } from '../../atoms/checkbox/checkbox';
import { LvSelectComponent } from '../../atoms/select/select';

import { LvFormFieldConfig } from '../../../types/form-field.type';
import { LvFormFieldComponent } from '../../molecules';
import { LvButtonGroupComponent } from '../../molecules';


@Component({
  selector: 'lv-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LvFormFieldComponent,
    LvInputComponent,
    LvCheckboxComponent,
    LvSelectComponent,
    LvButtonGroupComponent,
  ],


  templateUrl: './dynamic-form.html',
  styleUrls: ['./dynamic-form.css'],
})
export class LvDynamicFormComponent {
  readonly formGroup = input.required<FormGroup>();
  readonly fields = input.required<LvFormFieldConfig[]>();
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly submitLabel = input<string>('Guardar');
  readonly cancelLabel = input<string>('Cancelar');
  readonly loading = input(false);
  readonly columns = input<number>(2);


  readonly onSubmit = output<void>();
  readonly onCancel = output<void>();


  handleFooterAction(action: { key?: string }): void {
    if (action.key === 'cancel') this.onCancel.emit();
  }

  errorFor(key: string): string {
    const control = this.formGroup().get(key);
    if (control?.touched && control?.errors?.['required']) {
      return 'Este campo es obligatorio';
    }
    return '';
  }
}

