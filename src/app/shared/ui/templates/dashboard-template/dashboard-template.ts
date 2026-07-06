import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LV_DASHBOARD_TEMPLATE_BASE,
  LV_DASHBOARD_TEMPLATE_VARIANTS,
  LV_DASHBOARD_TEMPLATE_LAYOUT,
  LV_DASHBOARD_TEMPLATE_SIDEBAR,
  LV_DASHBOARD_TEMPLATE_MAIN,
  LV_DASHBOARD_TEMPLATE_CONTENT,
  LV_DASHBOARD_TEMPLATE_HEADER,
  LV_DASHBOARD_TEMPLATE_FOOTER,
} from '../../../theme/dashboard-template.theme';
import type { DashboardTemplateVariant, DashboardTemplateLayout } from '../../../types/dashboard-template.types';

@Component({
  selector: 'lv-dashboard-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-template.html',
  styleUrl: './dashboard-template.css',
})
export class LvDashboardTemplateComponent {
  readonly variant = input<DashboardTemplateVariant>('default');
  readonly layout = input<DashboardTemplateLayout>('both');

  readonly classes = computed(() => {
    const base = LV_DASHBOARD_TEMPLATE_BASE;
    const variant = LV_DASHBOARD_TEMPLATE_VARIANTS[this.variant()];
    const layout = LV_DASHBOARD_TEMPLATE_LAYOUT[this.layout()];

    return {
      template: [base, variant, layout].filter(Boolean).join(' '),
      sidebar: LV_DASHBOARD_TEMPLATE_SIDEBAR,
      main: LV_DASHBOARD_TEMPLATE_MAIN,
      content: LV_DASHBOARD_TEMPLATE_CONTENT,
      header: LV_DASHBOARD_TEMPLATE_HEADER,
      footer: LV_DASHBOARD_TEMPLATE_FOOTER,
    };
  });

  hasSidebar(): boolean {
    return this.layout() === 'sidebar' || this.layout() === 'both';
  }
}
