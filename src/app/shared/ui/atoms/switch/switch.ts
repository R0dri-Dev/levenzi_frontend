import { Component, computed, input, output } from '@angular/core';
import { SwitchSize } from '../../../types/switch.types';
import { LV_SWITCH_BASE, LV_SWITCH_SIZES, LV_SWITCH_THUMB } from '../../../theme/switch.theme';


@Component({
  selector: 'lv-switch',
  standalone: true,
  templateUrl: './switch.html'
})
export class LvSwitchComponent {

  readonly checked = input(false);

  readonly disabled = input(false);

  readonly size = input<SwitchSize>('md');

  readonly changed = output<boolean>();

  readonly classes = computed(() => [
    LV_SWITCH_BASE,
    LV_SWITCH_SIZES[this.size()],
    this.checked()
      ? 'bg-blue-600'
      : 'bg-gray-300'
  ].join(' '));

  readonly thumb = computed(() => [
    'absolute left-0.5 top-0.5 rounded-full bg-white transition-all duration-300',
    LV_SWITCH_THUMB[this.size()],
    this.checked()
      ? 'translate-x-full'
      : ''
  ].join(' '));

  toggle() {

    if (this.disabled()) return;

    this.changed.emit(!this.checked());

  }

}
