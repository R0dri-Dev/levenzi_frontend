import { Component, input } from '@angular/core';

import { LvSpinnerComponent } from '../spinner/spinner';
import { LV_LOADING_BASE } from '../../../theme/loading.theme';


@Component({

selector:'lv-loading',

standalone:true,

imports:[LvSpinnerComponent],

templateUrl:'./loading.html'

})
export class LvLoadingComponent{

readonly text=input('Cargando...');

readonly classes=LV_LOADING_BASE;

}
