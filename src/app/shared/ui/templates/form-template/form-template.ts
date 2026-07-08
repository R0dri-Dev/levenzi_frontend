import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvHeadingComponent } from '../../atoms/heading/heading';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvCardComponent } from '../../atoms/card/card';
import { LvDividerComponent } from '../../atoms/divider/divider';
import { LvSize, LvColorVariant, LvTextAlign } from '../../../types';

export type FormTemplateVariant = 'card' | 'simple';

@Component({
  selector: 'lv-form-template',
  standalone: true,
  imports: [
    CommonModule,
    LvHeadingComponent,
    LvParagraphComponent,
    LvCardComponent,
    LvDividerComponent,
  ],
  templateUrl: './form-template.html',
  styleUrls: ['./form-template.css'],
})
export class LvFormTemplateComponent {
  readonly variant = input<FormTemplateVariant>('card');
  readonly size = input<LvSize>('md');
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly loading = input(false);
  readonly footerText = input<string>('');
  readonly color = input<LvColorVariant>('primary');
  readonly align = input<LvTextAlign>('left');

  readonly onSubmit = output<void>();
}
