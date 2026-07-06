import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioSize } from '../../../types/radio.types';
import { LV_RADIO_BASE, LV_RADIO_SIZES } from '../../../theme';

@Component({
  selector: 'lv-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio.html',
})
export class LvRadioComponent {

  readonly name = input.required<string>();

  readonly value = input.required<string>();

  readonly checked = input(false);

  readonly disabled = input(false);

  readonly size = input<RadioSize>('md');

  readonly changed = output<string>();

  readonly classes = computed(() => [
    LV_RADIO_BASE,
    LV_RADIO_SIZES[this.size()]
  ].join(' '));

}
