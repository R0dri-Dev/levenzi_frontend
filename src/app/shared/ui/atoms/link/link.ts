import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkVariant } from '../../../types/link.types';
import { LV_LINK_BASE, LV_LINK_VARIANTS } from '../../../theme/link.theme';


@Component({
selector:'lv-link',
standalone:true,
imports:[RouterLink],
templateUrl:'./link.html'
})
export class LvLinkComponent{

readonly href=input('');

readonly routerLink=input('');

readonly external=input(false);

readonly variant=input<LinkVariant>('primary');

readonly classes=computed(()=>[
LV_LINK_BASE,
LV_LINK_VARIANTS[this.variant()]
].join(' '));

}
