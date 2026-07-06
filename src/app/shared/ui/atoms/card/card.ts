import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LV_CARD_THEME } from '../../../theme/card.theme';

@Component({
  selector: 'lv-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class LvCardComponent {
  readonly headerText = input<string | null>(null);
  readonly footerText = input<string | null>(null);

  readonly classes = computed(() => LV_CARD_THEME.base);

  readonly bodyClasses = computed(() => LV_CARD_THEME.body);
  readonly headerClasses = computed(() => LV_CARD_THEME.header);
  readonly footerClasses = computed(() => LV_CARD_THEME.footer);
}

