import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvButtonComponent } from '../../atoms/button/button';
import { LvHeadingComponent } from '../../atoms/heading/heading';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';
import { LvLinkComponent } from '../../atoms/link/link';
import { LvDividerComponent } from '../../atoms/divider/divider';
import { LvBadgeComponent } from '../../atoms/badge/badge';
import type { Notification } from '../../../interfaces/notification.interface';
import { IconKeys } from '../../../core/icons';
import { LvColorVariant } from '../../../types';

@Component({
  selector: 'lv-notifications-panel',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LvIconComponent,
    LvButtonComponent,
    LvHeadingComponent,
    LvParagraphComponent,
    LvIconButtonComponent,
    LvLinkComponent,
    LvDividerComponent,
    LvBadgeComponent,
  ],
  templateUrl: './notifications-panel.html',
  styleUrls: ['./notifications-panel.css'],
})
export class LvNotificationsPanelComponent {
  readonly notifications = input<Notification[]>([]);
  readonly loading = input(false);
  readonly title = input<string>('Notificaciones');
  readonly emptyMessage = input<string>('No tienes notificaciones');
  readonly showMarkAll = input(true);

  readonly onNotificationClick = output<Notification>();
  readonly onMarkAllRead = output<void>();
  readonly onClose = output<void>();

  readonly isOpen = signal(false);

  toggle(): void {
    this.isOpen.update(v => !v);
  }

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
    this.onClose.emit();
  }

  handleNotificationClick(notification: Notification): void {
    if (!notification.read) {
      notification.read = true;
    }
    this.onNotificationClick.emit(notification);
    if (notification.action) {
      notification.action();
    }
    this.close();
  }

  handleMarkAllRead(): void {
    this.onMarkAllRead.emit();
  }

  getUnreadCount(): number {
    return this.notifications().filter(n => !n.read).length;
  }

  getNotificationIcon(notification: Notification): IconKeys {
    return notification.icon || 'bell';
  }

  getNotificationVariant(notification: Notification): LvColorVariant {
    return notification.variant || 'info';
  }
}
