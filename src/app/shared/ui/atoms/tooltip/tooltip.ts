import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvColorVariant, LvPlacement } from '../../../types';

@Component({
  selector: 'lv-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.html',
  styleUrls: ['./tooltip.css'],
})
export class LvTooltipComponent {
  readonly content = input.required<string>();
  readonly placement = input<LvPlacement>('top');
  readonly color = input<LvColorVariant>('neutral');
  readonly delay = input<number>(200);
  readonly disabled = input(false);
  readonly showArrow = input(true);

  readonly isVisible = signal(false);
  private timeoutId: any = null;

  show(): void {
    if (this.disabled()) return;
    this.timeoutId = setTimeout(() => {
      this.isVisible.set(true);
    }, this.delay());
  }

  hide(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.isVisible.set(false);
  }
}
