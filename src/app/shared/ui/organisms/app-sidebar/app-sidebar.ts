import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LvBadgeComponent } from '../../atoms/badge/badge';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvLinkComponent } from '../../atoms/link/link';
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
    LvLinkComponent,
    LvDividerComponent,
    LvParagraphComponent
  ],
  templateUrl: './app-sidebar.html',
  styleUrls: ['./app-sidebar.css'],
})
export class LvAppSidebarComponent {
  readonly position = input<AppSidebarPosition>('left');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly compact = input(false);
  readonly items = input.required<AppSidebarItem[]>();
  readonly header = input<string>('');
  readonly footer = input<string>('');
  readonly showToggle = input(false);

  readonly onItemClick = output<AppSidebarItem>();
  readonly onToggle = output<void>();

  protected isCollapsed = signal(false);

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
