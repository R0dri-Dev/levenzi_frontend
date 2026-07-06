import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LV_FORM_TEMPLATE_BASE,
  LV_FORM_TEMPLATE_VARIANTS,
  LV_FORM_TEMPLATE_SIZES,
  LV_FORM_TEMPLATE_HEADER,
  LV_FORM_TEMPLATE_TITLE,
  LV_FORM_TEMPLATE_SUBTITLE,
  LV_FORM_TEMPLATE_BODY,
  LV_FORM_TEMPLATE_FOOTER,
} from '../../../theme/form-template.theme';
import type { FormTemplateVariant, FormTemplateSize } from '../../../types/form-template.types';

@Component({
  selector: 'lv-form-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-template.html',
  styleUrl: './form-template.css',
})
export class LvFormTemplateComponent {
  readonly variant = input<FormTemplateVariant>('card');
  readonly size = input<FormTemplateSize>('md');
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly loading = input(false);

  readonly classes = computed(() => {
    const base = LV_FORM_TEMPLATE_BASE;
    const variant = LV_FORM_TEMPLATE_VARIANTS[this.variant()];
    const size = LV_FORM_TEMPLATE_SIZES[this.size()];

    return {
      template: [base, variant, size].filter(Boolean).join(' '),
      header: LV_FORM_TEMPLATE_HEADER,
      title: LV_FORM_TEMPLATE_TITLE,
      subtitle: LV_FORM_TEMPLATE_SUBTITLE,
      body: LV_FORM_TEMPLATE_BODY,
      footer: LV_FORM_TEMPLATE_FOOTER,
    };
  });
}
