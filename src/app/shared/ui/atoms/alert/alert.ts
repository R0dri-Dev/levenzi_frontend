import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LvStatus,
  LvAlign,
  LvTextAlign,
  LvAlertStyle,
  LV_ALIGN_CLASS_MAP,
  LV_TEXT_ALIGN_CLASS_MAP,
} from '../../../types/common.types';
import {
  LV_ALERT_ICON_MAP,
  LV_ALERT_TITLE_MAP,
  LV_ALERT_SWEET_ICON_MAP,
} from '../../../types/alert.types';
import Swal from 'sweetalert2';
import { LvRadius } from '../../../types';

@Component({
  selector: 'lv-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.html',
})
export class LvAlertComponent {

  readonly message = input<string>('');
  readonly status = input<LvStatus>('info');
  readonly appearance = input<LvAlertStyle>('light');
  readonly rounded = input<LvRadius>('lg');
  readonly align = input<LvAlign>('start');
  readonly textAlign = input<LvTextAlign>('left');
  readonly dismissible = input<boolean>(false);
  readonly showIcon = input<boolean>(true);
  readonly title = input<string>('');

  readonly closed = output<void>();

  private readonly isVisible = signal(true);
  readonly visible = computed(() => this.isVisible());

  readonly icon = computed(() => LV_ALERT_ICON_MAP[this.status()]);
  readonly alertTitle = computed(() => this.title() || LV_ALERT_TITLE_MAP[this.status()]);

  // Clases de alineación (SOLO alineación)
  readonly containerClasses = computed(() => {
    const align = this.align();
    const textAlign = this.textAlign();

    let classes = 'flex-1 min-w-0';

    if (align) {
      classes += ` ${LV_ALIGN_CLASS_MAP[align] || ''}`;
    }

    if (textAlign) {
      classes += ` ${LV_TEXT_ALIGN_CLASS_MAP[textAlign] || ''}`;
    }

    return classes;
  });

  close(): void {
    this.isVisible.set(false);
    this.closed.emit();
    this.showSweetAlert();
  }

  // SweetAlert2 (usando tipos de alert.types.ts)
  private showSweetAlert(): void {
    const status = this.status();

    Swal.fire({
      title: this.alertTitle(),
      text: this.message(),
      icon: LV_ALERT_SWEET_ICON_MAP[status],
      confirmButtonText: 'Entendido',
    });
  }
}
