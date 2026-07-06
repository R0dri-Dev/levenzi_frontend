import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LV_PAGE_ACTIONS_BASE, LV_PAGE_ACTIONS_ALIGNMENTS } from '../../../theme/page-actions.theme';
import type { PageActionAlignment } from '../../../types/page-actions.types';

@Component({
  selector: 'lv-page-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-actions.html',
  styleUrl: './page-actions.css',
})
export class LvPageActionsComponent {
  readonly alignment = input<PageActionAlignment>('right');
  readonly gap = input<string>('2');

  readonly classes = computed(() => {
    const base = LV_PAGE_ACTIONS_BASE;
    const alignment = LV_PAGE_ACTIONS_ALIGNMENTS[this.alignment()];
    const gap = `gap-${this.gap()}`;
    return `${base} ${alignment} ${gap}`;
  });
}
