import { Component, computed, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { LvSize } from '../../../types';
import { LV_ICONS } from '../../../core/icons';

@Component({
  selector: 'lv-icon',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './icon.html',
})
export class LvIconComponent {
  readonly name = input<string>('home');
  readonly size = input<LvSize>('md');
  readonly strokeWidth = input<number>(2);
  readonly color = input<string>('currentColor');

  readonly icon = computed(() => {
    const iconName = this.name() as keyof typeof LV_ICONS;
    return LV_ICONS[iconName] ?? LV_ICONS.home;
  });

  readonly sizeClass = computed(() => {
    const sizes: Record<LvSize, string> = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
    };
    return sizes[this.size()] || sizes.md;
  });
}
