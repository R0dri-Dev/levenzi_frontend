import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvLabelComponent } from '../../atoms/label/label';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';

@Component({
  selector: 'lv-form-field',
  standalone: true,
  imports: [CommonModule, LvLabelComponent, LvParagraphComponent],
  templateUrl: './form-field.html',
  styleUrls: ['./form-field.css'],
})
export class LvFormFieldComponent {
  readonly label = input<string>('');
  readonly required = input(false);
  readonly error = input<string>('');
  readonly hint = input<string>('');
}
