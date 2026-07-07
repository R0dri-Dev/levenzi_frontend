// src/app/shared/ui/templates/auth-template/auth-template.ts
import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvHeadingComponent } from '../../atoms/heading/heading';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvLogoComponent } from '../../atoms/logo/logo';
import { LvCardComponent } from '../../atoms/card/card';
import { LvIconComponent } from '../../icons/icon/icon';

import {
  LV_AUTH_TEMPLATE_BASE,
  LV_AUTH_TEMPLATE_VARIANTS,
  LV_AUTH_TEMPLATE_CONTAINER,
  LV_AUTH_TEMPLATE_CARD,
  LV_AUTH_TEMPLATE_SIZES,
  LV_AUTH_TEMPLATE_SPLIT,
  LV_AUTH_TEMPLATE_SPLIT_LEFT,
  LV_AUTH_TEMPLATE_SPLIT_RIGHT,
  LV_AUTH_TEMPLATE_LOGO,
  LV_AUTH_TEMPLATE_HEADER,
  LV_AUTH_TEMPLATE_TITLE,
  LV_AUTH_TEMPLATE_SUBTITLE,
} from '../../../theme/auth-template.theme';
import type { AuthTemplateVariant, AuthTemplateSize } from '../../../types/auth-template.types';

@Component({
  selector: 'lv-auth-template',
  standalone: true,
  imports: [
    CommonModule,
    LvHeadingComponent,
    LvParagraphComponent,
    LvLogoComponent,
    LvCardComponent,
    LvIconComponent
  ],
  templateUrl: './auth-template.html',
  // styleUrl: './auth-template.css', // ← ELIMINADO
})
export class LvAuthTemplateComponent {
  readonly variant = input<AuthTemplateVariant>('centered');
  readonly size = input<AuthTemplateSize>('md');
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly logo = input<string>('');
  readonly logoUrl = input<string>('/');
  readonly backgroundImage = input<string>('');
  readonly showBranding = input(true);

  protected readonly LV_AUTH_TEMPLATE_SPLIT = LV_AUTH_TEMPLATE_SPLIT;
  protected readonly LV_AUTH_TEMPLATE_SPLIT_LEFT = LV_AUTH_TEMPLATE_SPLIT_LEFT;
  protected readonly LV_AUTH_TEMPLATE_SPLIT_RIGHT = LV_AUTH_TEMPLATE_SPLIT_RIGHT;
  protected readonly LV_AUTH_TEMPLATE_LOGO = LV_AUTH_TEMPLATE_LOGO;
  protected readonly LV_AUTH_TEMPLATE_HEADER = LV_AUTH_TEMPLATE_HEADER;
  protected readonly LV_AUTH_TEMPLATE_TITLE = LV_AUTH_TEMPLATE_TITLE;
  protected readonly LV_AUTH_TEMPLATE_SUBTITLE = LV_AUTH_TEMPLATE_SUBTITLE;

  readonly classes = computed(() => {
    const base = LV_AUTH_TEMPLATE_BASE;
    const variant = LV_AUTH_TEMPLATE_VARIANTS[this.variant()] || '';
    const container = LV_AUTH_TEMPLATE_CONTAINER;
    const card = LV_AUTH_TEMPLATE_CARD;
    const size = LV_AUTH_TEMPLATE_SIZES[this.size()] || '';

    return {
      template: [base, variant].filter(Boolean).join(' '),
      container: container,
      card: [card, size].filter(Boolean).join(' '),
    };
  });
}
