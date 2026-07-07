// shared/ui/atoms/form-error/form-error.ts
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvIconComponent } from '../../icons/icon/icon';
import {
  LV_FORM_ERROR_BASE,
  LV_FORM_ERROR_VARIANTS,
  LV_FORM_ERROR_SIZES,
  LV_FORM_ERROR_ICON_CLASS
} from '../../../theme/form-error.theme';
import type { FormErrorVariant, FormErrorSize } from '../../../types/form-error.types';
import type { IconKeys } from '../../../core/icons';
import { LvParagraphComponent } from '../../atoms';

@Component({
  selector: 'lv-form-error',
  standalone: true,
  imports: [CommonModule, LvIconComponent, LvParagraphComponent],
  templateUrl: './form-error.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LvFormErrorComponent {
  readonly message = input.required<string>();
  readonly variant = input<FormErrorVariant>('error');
  readonly size = input<FormErrorSize>('md');
  readonly icon = input<IconKeys>('close');
  readonly showIcon = input(true);

  readonly classes = computed(() => {
    const base = LV_FORM_ERROR_BASE;
    const variant = LV_FORM_ERROR_VARIANTS[this.variant()];
    const size = LV_FORM_ERROR_SIZES[this.size()];

    return {
      container: [base, variant, size].filter(Boolean).join(' '),
      icon: LV_FORM_ERROR_ICON_CLASS,
    };
  });
}
