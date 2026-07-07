// shared/ui/atoms/logo/logo.ts
import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LvIconComponent } from '../../icons/icon/icon';
import { LV_LOGO_BASE, LV_LOGO_SIZES } from '../../../theme/logo.theme';
import { LV_COLORS } from '../../../theme/colors';
import type { LogoSize } from '../../../types/logo.types';

@Component({
  selector: 'lv-logo',
  standalone: true,
  imports: [CommonModule, RouterModule, LvIconComponent],
  templateUrl: './logo.html',
})
export class LvLogoComponent {
  readonly text = input<string>('Levenzi');
  readonly size = input<LogoSize>('md');
  readonly showIcon = input(true);
  readonly link = input<string>('/');
  readonly color = input<string>('gray');

  readonly classes = computed(() => {
    const base = LV_LOGO_BASE;
    const size = LV_LOGO_SIZES[this.size()] || '';

    const colorMap: Record<string, string> = {
      gray: LV_COLORS.gray.text,
      white: 'text-white',
      blue: LV_COLORS.primary.text,
      red: LV_COLORS.danger.text,
      green: LV_COLORS.success.text,
      yellow: LV_COLORS.warning.text,
    };
    const color = colorMap[this.color()] || colorMap['gray'];

    return [base, size, color].filter(Boolean).join(' ');
  });
}
