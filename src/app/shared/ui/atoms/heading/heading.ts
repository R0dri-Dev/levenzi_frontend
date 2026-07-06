import { Component, computed, input } from '@angular/core';
import { HeadingLevel } from '../../../types/heading.types';
import { LV_HEADING_LEVELS } from '../../../theme/heading.theme';


@Component({
  selector:'lv-heading',
  standalone:true,
  templateUrl:'./heading.html'
})
export class LvHeadingComponent{

readonly level=input<HeadingLevel>('1');

readonly subtitle=input('');

readonly classes=computed(()=>LV_HEADING_LEVELS[this.level()]);

}
