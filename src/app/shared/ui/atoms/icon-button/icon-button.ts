import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvSize, LvColorVariant, LvAppearance } from '../../../types';
import type { IconKeys } from '../../../core/icons';

@Component({
  selector: 'lv-icon-button',
  standalone: true,
  imports: [CommonModule, LvIconComponent],
  templateUrl: './icon-button.html',
  styleUrls: ['./icon-button.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LvIconButtonComponent {
  readonly icon = input.required<IconKeys>();
  readonly label = input.required<string>();
  readonly variant = input<LvAppearance>('ghost');
  readonly color = input<LvColorVariant>('primary');
  readonly size = input<LvSize>('md');
  readonly disabled = input(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  readonly onClick = output<Event>();

  handleClick(event: Event): void {
    if (this.disabled()) return;
    this.onClick.emit(event);
  }
}
