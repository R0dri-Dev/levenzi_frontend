import { Component, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LvInputComponent } from '../../atoms/input/input';
import { LvButtonComponent } from '../../atoms/button/button';
import { LvPasswordFieldComponent } from '../../molecules/password-field/password-field';
import { LvCheckboxComponent } from '../../atoms/checkbox/checkbox';

import { LvFormErrorComponent } from '../../molecules/form-error/form-error';

@Component({
  selector: 'lv-register-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LvInputComponent,
    LvButtonComponent,
    LvPasswordFieldComponent,
    LvCheckboxComponent,
    LvFormErrorComponent
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class LvRegisterFormComponent {
}
