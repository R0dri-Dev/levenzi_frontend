import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvIconComponent } from '../../icons/icon/icon';
import type { IconKeys } from '../../../core/icons/icons';
import { LvSize, LvColorVariant } from '../../../types';

@Component({
  selector: 'lv-button',
  standalone: true,
  imports: [CommonModule, LvIconComponent],
  templateUrl: './button.html',
  styleUrls: ['./button.css'],
})
export class LvButtonComponent {
  // Inputs
  readonly variant = input<LvColorVariant>('primary');
  readonly size = input<LvSize>('md');
  readonly loading = input(false);
  readonly disabled = input(false);
  readonly fullWidth = input(false);
  readonly leftIcon = input<IconKeys>();
  readonly rightIcon = input<IconKeys>();
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  // Outputs
  readonly onClick = output<Event>();

  // Computed
  readonly isDisabled = computed(() => this.disabled() || this.loading());

  handleClick(event: Event): void {
    if (this.isDisabled()) return;
    this.onClick.emit(event);
  }
}
