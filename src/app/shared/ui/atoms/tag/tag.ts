import { Component, computed, input } from '@angular/core';
import { TagVariant } from '../../../types/tag.types';
import { LV_TAG_BASE, LV_TAG_VARIANTS } from '../../../theme/tag.theme';


@Component({

  selector: 'lv-tag',

  standalone: true,

  templateUrl: './tag.html'

})
export class LvTagComponent {

  readonly variant = input<TagVariant>('primary');

  readonly classes = computed(() => [
    LV_TAG_BASE,
    LV_TAG_VARIANTS[this.variant()]
  ].join(' '));

}
