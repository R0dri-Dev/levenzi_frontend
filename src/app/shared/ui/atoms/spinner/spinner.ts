import { Component, computed, input } from '@angular/core';
import { SpinnerColor, SpinnerSize } from '../../../types/spinner.types';
import { LV_SPINNER_BASE, LV_SPINNER_COLORS, LV_SPINNER_SIZES } from '../../../theme/spinner.theme';


@Component({

  selector: 'lv-spinner',

  standalone: true,

  templateUrl: './spinner.html'

})
export class LvSpinnerComponent {

  readonly size = input<SpinnerSize>('md');

  readonly color = input<SpinnerColor>('primary');

  readonly classes = computed(() => [

    LV_SPINNER_BASE,

    LV_SPINNER_SIZES[this.size()],

    LV_SPINNER_COLORS[this.color()]

  ].join(' '));

}
