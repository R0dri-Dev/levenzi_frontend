import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvHeadingComponent } from '../../atoms/heading/heading';
import { LvIconComponent } from '../../icons/icon/icon';
import type { HeadingLevel } from '../../../types/heading.types';
import type { IconKeys } from '../../../core/icons';

@Component({
  selector: 'lv-page-title',
  standalone: true,
  imports: [CommonModule, LvHeadingComponent, LvIconComponent],
  templateUrl: './page-title.html',
  styleUrl: './page-title.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LvPageTitleComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly level = input<HeadingLevel>('2');
  readonly icon = input<IconKeys>();

  readonly classes = computed(() => ({
    container: 'flex items-start gap-3',
    icon: 'mt-1 shrink-0 text-gray-500',
    content: 'min-w-0',
  }));
}
