import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DashboardTemplateVariant = 'default' | 'bordered' | 'shadow';
export type DashboardTemplateLayout = 'sidebar' | 'top-nav' | 'both';

@Component({
  selector: 'lv-dashboard-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-template.html',
  styleUrls: ['./dashboard-template.css'],
})
export class LvDashboardTemplateComponent {
  readonly variant = input<DashboardTemplateVariant>('default');
  readonly layout = input<DashboardTemplateLayout>('both');

  readonly mobileSidebarOpen = signal(false);

  hasSidebar(): boolean {
    return this.layout() === 'sidebar' || this.layout() === 'both';
  }

  hasHeader(): boolean {
    return this.layout() === 'top-nav' || this.layout() === 'both';
  }

  toggleSidebar(): void {
    this.mobileSidebarOpen.update(v => !v);
  }

  closeSidebar(): void {
    this.mobileSidebarOpen.set(false);
  }
}
