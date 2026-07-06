import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvBreadcrumbComponent } from '../../molecules/breadcrumb/breadcrumb';

import {
  LV_PAGE_HEADER_BASE,
  LV_PAGE_HEADER_VARIANTS,
  LV_PAGE_HEADER_CONTENT,
  LV_PAGE_HEADER_TITLE,
  LV_PAGE_HEADER_SUBTITLE,
  LV_PAGE_HEADER_ACTIONS,
  LV_PAGE_HEADER_BREADCRUMB,
} from '../../../theme/page-header.theme';
import type { PageHeaderVariant, PageHeaderAlignment } from '../../../types/page-header.types';
import type { BreadcrumbItem } from '../../../types/breadcrumb.types';
import { LvIconComponent } from '../../icons/icon/icon';

@Component({
  selector: 'lv-page-header',
  standalone: true,
  imports: [CommonModule, LvBreadcrumbComponent, LvIconComponent],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
})
export class LvPageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly variant = input<PageHeaderVariant>('default');
  readonly alignment = input<PageHeaderAlignment>('left');
  readonly icon = input<string>();
  readonly breadcrumb = input<BreadcrumbItem[]>([]);

  readonly classes = computed(() => {
    const base = LV_PAGE_HEADER_BASE;
    const variant = LV_PAGE_HEADER_VARIANTS[this.variant()];

    return {
      header: [base, variant].filter(Boolean).join(' '),
      content: LV_PAGE_HEADER_CONTENT,
      title: LV_PAGE_HEADER_TITLE,
      subtitle: LV_PAGE_HEADER_SUBTITLE,
      actions: LV_PAGE_HEADER_ACTIONS,
      breadcrumb: LV_PAGE_HEADER_BREADCRUMB,
    };
  });

  getAlignmentClass(): string {
    const map: Record<PageHeaderAlignment, string> = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    };
    return map[this.alignment()];
  }
}
