import { Component, computed, input } from '@angular/core';
import { DividerOrientation } from '../../../types/divider.types';
import { LV_DIVIDER_BASE, LV_DIVIDER_ORIENTATION } from '../../../theme/divider.theme';


@Component({
  selector: 'lv-divider',
  standalone: true,
  templateUrl: './divider.html',
})
export class LvDividerComponent {

  readonly text=input('');

  readonly orientation=input<DividerOrientation>('horizontal');

  readonly classes=computed(()=>[
    LV_DIVIDER_BASE,
    LV_DIVIDER_ORIENTATION[this.orientation()]
  ].join(' '));

}
