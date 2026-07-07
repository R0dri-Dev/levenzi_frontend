import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';

import {
  LV_NOTIFICATION_ITEM_BASE,
  LV_NOTIFICATION_ITEM_SIZES,
  LV_NOTIFICATION_ITEM_VARIANTS,
  LV_NOTIFICATION_ITEM_ICON,
  LV_NOTIFICATION_ITEM_ICON_VARIANTS,
  LV_NOTIFICATION_ITEM_ICON_ICONS,
  LV_NOTIFICATION_ITEM_TITLE,
  LV_NOTIFICATION_ITEM_MESSAGE,
  LV_NOTIFICATION_ITEM_TIME,
  LV_NOTIFICATION_ITEM_CLOSE,
} from '../../../theme/notification-item.theme';
import type { NotificationVariant, NotificationSize } from '../../../types/notification-item.types';
import { LvIconComponent } from '../../icons/icon/icon';

@Component({
  selector: 'lv-notification-item',
  standalone: true,
  imports: [CommonModule, LvIconComponent, LvIconButtonComponent],
  templateUrl: './notification-item.html',
  styleUrl: './notification-item.css',
})
export class LvNotificationItemComponent {
  readonly variant = input<NotificationVariant>('info');
  readonly size = input<NotificationSize>('md');
  readonly title = input.required<string>();
  readonly message = input.required<string>();
  readonly time = input<string>();
  readonly closable = input(true);
  readonly autoClose = input<number>();
  readonly onDismiss = output<void>();

  readonly onClose = output<void>();
  readonly onClick = output<void>();

  readonly classes = computed(() => {
    const base = LV_NOTIFICATION_ITEM_BASE;
    const size = LV_NOTIFICATION_ITEM_SIZES[this.size()];
    const variant = LV_NOTIFICATION_ITEM_VARIANTS[this.variant()];

    return {
      container: [base, size, variant].filter(Boolean).join(' '),
      icon: [LV_NOTIFICATION_ITEM_ICON, LV_NOTIFICATION_ITEM_ICON_VARIANTS[this.variant()]].filter(Boolean).join(' '),
      title: LV_NOTIFICATION_ITEM_TITLE,
      message: LV_NOTIFICATION_ITEM_MESSAGE,
      time: LV_NOTIFICATION_ITEM_TIME,
      close: LV_NOTIFICATION_ITEM_CLOSE,
    };
  });

  getIconName(): string {
    return LV_NOTIFICATION_ITEM_ICON_ICONS[this.variant()];
  }

  handleClose(): void {
    this.onClose.emit();
  }

  handleClick(): void {
    this.onClick.emit();
  }
  
   dismiss(): void {
    this.onDismiss.emit();
  }
}
