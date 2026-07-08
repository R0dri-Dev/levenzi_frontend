import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvHeadingComponent } from '../../atoms/heading/heading';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvDividerComponent } from '../../atoms/divider/divider';
import { LvSize, LvColorVariant } from '../../../types';

export type CrudTemplateVariant = 'default' | 'bordered' | 'shadow';

@Component({
  selector: 'lv-crud-template',
  standalone: true,
  imports: [CommonModule, LvHeadingComponent, LvParagraphComponent],
  templateUrl: './crud-template.html',
  styleUrls: ['./crud-template.css'],
})
export class LvCrudTemplateComponent {
  readonly variant = input<CrudTemplateVariant>('default');
  readonly size = input<LvSize>('xl');
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly color = input<LvColorVariant>('primary');
}
