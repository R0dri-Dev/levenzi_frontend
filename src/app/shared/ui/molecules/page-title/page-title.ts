import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvHeadingComponent } from '../../atoms/heading/heading';
import { LvIconComponent } from '../../icons/icon/icon';
import type { IconKeys } from '../../../core/icons';
import { LvColorVariant } from '../../../types';
import { LvLevel } from '../../../types/level.types';


@Component({
  selector: 'lv-page-title',
  standalone: true,
  imports: [CommonModule, LvHeadingComponent, LvIconComponent],
  templateUrl: './page-title.html',
  styleUrls: ['./page-title.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LvPageTitleComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
  readonly level = input<LvLevel>('2');
  readonly icon = input<IconKeys>();
  readonly color = input<LvColorVariant>('neutral');
}
