import { Component, computed, input, output } from '@angular/core';
import { ChipSize, ChipVariant } from '../../../types/chip.types';
import { LV_CHIP_BASE, LV_CHIP_SIZES, LV_CHIP_VARIANTS } from '../../../theme/chip.theme';


@Component({
  selector: 'lv-chip',
  standalone: true,
  templateUrl: './chip.html',
})
export class LvChipComponent {

  readonly label = input.required<string>();

  readonly size = input<ChipSize>('md');

  readonly variant = input<ChipVariant>('primary');

  readonly removable = input(false);

  readonly disabled = input(false);

  readonly clicked = output<void>();

  readonly removed = output<void>();

  readonly classes = computed(() => [
    LV_CHIP_BASE,
    LV_CHIP_SIZES[this.size()],
    LV_CHIP_VARIANTS[this.variant()],
    this.disabled() ? 'opacity-60 pointer-events-none' : 'cursor-pointer'
  ].join(' '));

}
