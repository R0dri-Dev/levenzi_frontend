import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvSize } from '../../../types';
import type { IconKeys } from '../../../core/icons';

export type FormErrorVariant = 'error' | 'warning' | 'info' | 'success';

@Component({
  selector: 'lv-form-error',
  standalone: true,
  imports: [CommonModule, LvIconComponent, LvParagraphComponent],
  templateUrl: './form-error.html',
  styleUrls: ['./form-error.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LvFormErrorComponent {
  readonly message = input.required<string>();
  readonly variant = input<FormErrorVariant>('error');
  readonly size = input<LvSize>('md');
  readonly icon = input<IconKeys>('close');
  readonly showIcon = input(true);
}
