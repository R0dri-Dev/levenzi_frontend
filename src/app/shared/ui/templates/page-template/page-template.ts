import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvSize } from '../../../types';

export type PageTemplateVariant = 'default' | 'bordered' | 'shadow';

@Component({
  selector: 'lv-page-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-template.html',
  styleUrls: ['./page-template.css'],
})
export class LvPageTemplateComponent {
  readonly variant = input<PageTemplateVariant>('default');
  readonly size = input<LvSize>('xl');
  readonly fullWidth = input(false);
}
