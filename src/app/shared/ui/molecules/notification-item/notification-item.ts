import { Component, input, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvHeadingComponent } from '../../atoms/heading/heading';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvSize, LvColorVariant } from '../../../types';

@Component({
  selector: 'lv-notification-item',
  standalone: true,
  imports: [CommonModule, LvIconComponent, LvIconButtonComponent, LvHeadingComponent, LvParagraphComponent],
  templateUrl: './notification-item.html',
  styleUrls: ['./notification-item.css'],
})
export class LvNotificationItemComponent implements OnInit {
  readonly variant = input<LvColorVariant>('info');
  readonly size = input<LvSize>('md');
  readonly title = input.required<string>();
  readonly message = input.required<string>();
  readonly time = input<string>();
  readonly closable = input<boolean>(true);
  readonly autoClose = input<number>();

  readonly onDismiss = output<void>();
  readonly onClose = output<void>();
  readonly onClick = output<void>();

  private autoCloseTimer: any = null;

  ngOnInit(): void {
    if (this.autoClose()) {
      this.autoCloseTimer = setTimeout(() => {
        this.dismiss();
      }, this.autoClose());
    }
  }

  dismiss(): void {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = null;
    }
    this.onDismiss.emit();
    this.onClose.emit();
  }

  handleClick(): void {
    this.onClick.emit();
  }
}
