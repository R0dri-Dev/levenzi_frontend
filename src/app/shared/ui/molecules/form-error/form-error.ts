import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvIconComponent } from '../../icons/icon/icon';

@Component({
  selector: 'lv-form-error',
  standalone: true,
  imports: [CommonModule, LvIconComponent],
  templateUrl: './form-error.html',
  styleUrl: './form-error.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LvFormErrorComponent {
  readonly message = input.required<string>();
  readonly icon = input<'close'>('close');
  readonly showIcon = input(true);

  readonly classes = computed(() => ({
    container: 'flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700',
    icon: 'mt-0.5 shrink-0 text-red-500',
    message: 'min-w-0',
  }));
}
