import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LV_PAGE_TEMPLATE_BASE,
  LV_PAGE_TEMPLATE_VARIANTS,
  LV_PAGE_TEMPLATE_SIZES,
  LV_PAGE_TEMPLATE_CONTAINER,
  LV_PAGE_TEMPLATE_CONTENT,
} from '../../../theme/page-template.theme';
import type { PageTemplateVariant, PageTemplateSize } from '../../../types/page-template.types';

@Component({
  selector: 'lv-page-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-template.html',
  styleUrl: './page-template.css',
})
export class LvPageTemplateComponent {
  readonly variant = input<PageTemplateVariant>('default');
  readonly size = input<PageTemplateSize>('xl');

  readonly classes = computed(() => {
    const base = LV_PAGE_TEMPLATE_BASE;
    const variant = LV_PAGE_TEMPLATE_VARIANTS[this.variant()];
    const size = LV_PAGE_TEMPLATE_SIZES[this.size()];

    return {
      template: [base, variant].filter(Boolean).join(' '),
      container: [LV_PAGE_TEMPLATE_CONTAINER, size].filter(Boolean).join(' '),
      content: LV_PAGE_TEMPLATE_CONTENT,
    };
  });
}
