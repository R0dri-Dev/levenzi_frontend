import { Component, computed, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { LV_ICON_THEME } from '../../../theme';
import { IconSize, IconStroke, LV_ICONS } from '../../../core/icons';


@Component({
  selector: 'lv-icon',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './icon.html'
})

export class LvIconComponent {

  readonly name = input<keyof typeof LV_ICONS>('home');

  readonly size = input<IconSize>('md');

  readonly strokeWidth = input<IconStroke>(2);

  readonly icon = computed(() => LV_ICONS[this.name()]);

  readonly classes = computed(() => [
    LV_ICON_THEME.base,
    LV_ICON_THEME.sizes[this.size()]
  ].join(' '));

}
