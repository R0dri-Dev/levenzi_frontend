import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LvBadgeComponent } from '../../atoms/badge/badge';
import { LvIconComponent } from '../../icons/icon/icon';

import {
  LV_APP_SIDEBAR_BASE,
  LV_APP_SIDEBAR_VARIANTS,
  LV_APP_SIDEBAR_SIZES,
  LV_APP_SIDEBAR_COMPACT_SIZES,
  LV_APP_SIDEBAR_ITEM,
  LV_APP_SIDEBAR_ITEM_ACTIVE,
  LV_APP_SIDEBAR_ITEM_ICON,
  LV_APP_SIDEBAR_ITEM_LABEL,
  LV_APP_SIDEBAR_ITEM_BADGE,
  LV_APP_SIDEBAR_DIVIDER,
  LV_APP_SIDEBAR_HEADER,
  LV_APP_SIDEBAR_FOOTER,
} from '../../../theme/app-sidebar.theme';
import type { AppSidebarVariant, AppSidebarPosition, AppSidebarItem } from '../../../types/app-sidebar.types';

@Component({
  selector: 'lv-app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LvIconComponent, LvBadgeComponent],
  templateUrl: './app-sidebar.html',
  styleUrl: './app-sidebar.css',
})
export class LvAppSidebarComponent {
  readonly variant = input<AppSidebarVariant>('default');
  readonly position = input<AppSidebarPosition>('left');
  readonly size = input<'sm' | 'md' | 'lg'>('md');  // ← AGREGA ESTA LÍNEA
  readonly compact = input(false);
  readonly items = input.required<AppSidebarItem[]>();
  readonly header = input<string>('');
  readonly footer = input<string>('');
  readonly showToggle = input(false);

  readonly onItemClick = output<AppSidebarItem>();
  readonly onToggle = output<void>();

  private isCollapsed = signal(false);

  readonly classes = computed(() => {
    const base = LV_APP_SIDEBAR_BASE;
    const variant = LV_APP_SIDEBAR_VARIANTS[this.variant()];
    const size = this.isCollapsed() || this.compact()
      ? LV_APP_SIDEBAR_COMPACT_SIZES[this.size()]
      : LV_APP_SIDEBAR_SIZES[this.size()];
    const position = this.position() === 'left' ? 'border-r' : 'border-l';

    return {
      sidebar: [base, variant, size, position].filter(Boolean).join(' '),
      item: LV_APP_SIDEBAR_ITEM,
      itemActive: LV_APP_SIDEBAR_ITEM_ACTIVE,
      icon: LV_APP_SIDEBAR_ITEM_ICON,
      label: LV_APP_SIDEBAR_ITEM_LABEL,
      badge: LV_APP_SIDEBAR_ITEM_BADGE,
      divider: LV_APP_SIDEBAR_DIVIDER,
      header: LV_APP_SIDEBAR_HEADER,
      footer: LV_APP_SIDEBAR_FOOTER,
    };
  });

  handleItemClick(item: AppSidebarItem): void {
    this.onItemClick.emit(item);
  }

  isActive(item: AppSidebarItem): boolean {
    return item.active || false;
  }

  toggleSidebar(): void {
    this.isCollapsed.update(v => !v);
    this.onToggle.emit();
  }

  isCollapsedMode(): boolean {
    return this.isCollapsed() || this.compact();
  }
}
