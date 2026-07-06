import { Component, computed, input } from '@angular/core';
import { LV_SKELETON_BASE } from '../../../theme/skeleton.theme';


@Component({

  selector: 'lv-skeleton',

  standalone: true,

  templateUrl: './skeleton.html'

})
export class LvSkeletonComponent {

  readonly width = input('100%');

  readonly height = input('1rem');

  readonly circle = input(false);

  readonly classes = computed(() => [
    LV_SKELETON_BASE,
    this.circle() ? 'rounded-full' : 'rounded-lg'
  ].join(' '));

}
