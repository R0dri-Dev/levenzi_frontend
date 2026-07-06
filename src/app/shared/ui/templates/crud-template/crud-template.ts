import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LV_CRUD_TEMPLATE_BASE,
  LV_CRUD_TEMPLATE_VARIANTS,
  LV_CRUD_TEMPLATE_SIZES,
  LV_CRUD_TEMPLATE_TOOLBAR,
  LV_CRUD_TEMPLATE_CONTENT,
  LV_CRUD_TEMPLATE_ACTIONS,
} from '../../../theme/crud-template.theme';
import type { CrudTemplateVariant, CrudTemplateSize } from '../../../types/crud-template.types';

@Component({
  selector: 'lv-crud-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crud-template.html',
  styleUrl: './crud-template.css',
})
export class LvCrudTemplateComponent {
  readonly variant = input<CrudTemplateVariant>('default');
  readonly size = input<CrudTemplateSize>('xl');
  readonly title = input<string>('');
  readonly subtitle = input<string>('');

  readonly classes = computed(() => {
    const base = LV_CRUD_TEMPLATE_BASE;
    const variant = LV_CRUD_TEMPLATE_VARIANTS[this.variant()];
    const size = LV_CRUD_TEMPLATE_SIZES[this.size()];

    return {
      template: [base, variant, size].filter(Boolean).join(' '),
      toolbar: LV_CRUD_TEMPLATE_TOOLBAR,
      content: LV_CRUD_TEMPLATE_CONTENT,
      actions: LV_CRUD_TEMPLATE_ACTIONS,
    };
  });
}
