import { Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { LvBadgeComponent } from '../../atoms/badge/badge';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvDividerComponent } from '../../atoms/divider/divider';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import type { AppSidebarItem } from '../../../interfaces/app-sidebar.interface';

export type AppSidebarPosition = 'left' | 'right';

@Component({
  selector: 'lv-app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LvIconComponent,
    LvBadgeComponent,
    LvIconButtonComponent,
    LvDividerComponent,
    LvParagraphComponent
  ],
  templateUrl: './app-sidebar.html',
  styleUrls: ['./app-sidebar.css'],
})
export class LvAppSidebarComponent {
  private readonly router = inject(Router);

  readonly position = input<AppSidebarPosition>('left');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly compact = input(false);
  readonly items = input.required<AppSidebarItem[]>();
  readonly header = input<string>('');
  readonly footer = input<string>('');
  readonly showToggle = input(false);
  readonly logo = input<string>('');

  readonly onItemClick = output<AppSidebarItem>();
  readonly onToggle = output<void>();

  protected isCollapsed = signal(false);
  protected readonly currentUrl = signal(this.router.url);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.set(this.router.url);
      }
    });
  }

  handleItemClick(item: AppSidebarItem): void {
    this.onItemClick.emit(item);
  }

  isActive(item: AppSidebarItem): boolean {
    const currentUrl = this.currentUrl();
    const itemRoute = item.route;

    if (!itemRoute) {
      return Boolean(item.active);
    }

    const normalizedCurrent = currentUrl.replace(/\?.*$/, '').replace(/\/$/, '');
    const normalizedRoute = itemRoute.replace(/\?.*$/, '').replace(/\/$/, '');

    if (!normalizedRoute) {
      return false;
    }

    return normalizedCurrent === normalizedRoute || normalizedCurrent.startsWith(`${normalizedRoute}/`);
  }

  toggleSidebar(): void {
    this.isCollapsed.update(v => !v);
    this.onToggle.emit();
  }

  isCollapsedMode(): boolean {
    return this.isCollapsed() || this.compact();
  }
}
