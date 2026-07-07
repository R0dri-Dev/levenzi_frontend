import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';

import {
  LV_APP_FOOTER_BASE,
  LV_APP_FOOTER_VARIANTS,
  LV_APP_FOOTER_CONTENT,
  LV_APP_FOOTER_GRID,
  LV_APP_FOOTER_SECTION_TITLE,
  LV_APP_FOOTER_LINK,
  LV_APP_FOOTER_BOTTOM,
  LV_APP_FOOTER_COPYRIGHT,
  LV_APP_FOOTER_SOCIAL,
} from '../../../theme/app-footer.theme';
import type { AppFooterVariant, FooterSection, FooterLink } from '../../../types/app-footer.types';
import { LvIconComponent } from '../../icons/icon/icon';
import { IconKeys } from '../../../core/icons';

@Component({
  selector: 'lv-app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, LvIconComponent, LvIconButtonComponent],
  templateUrl: './app-footer.html',
  styleUrl: './app-footer.css',
})
export class LvAppFooterComponent {
  readonly variant = input<AppFooterVariant>('default');
  readonly sections = input<FooterSection[]>([]);
  readonly copyright = input<string>('© 2024 Levenzi. Todos los derechos reservados.');
  readonly socialLinks = input<FooterLink[]>([]);

  readonly classes = computed(() => {
    const base = LV_APP_FOOTER_BASE;
    const variant = LV_APP_FOOTER_VARIANTS[this.variant()];

    return {
      footer: [base, variant].filter(Boolean).join(' '),
      content: LV_APP_FOOTER_CONTENT,
      grid: LV_APP_FOOTER_GRID,
      sectionTitle: LV_APP_FOOTER_SECTION_TITLE,
      link: LV_APP_FOOTER_LINK,
      bottom: LV_APP_FOOTER_BOTTOM,
      copyright: LV_APP_FOOTER_COPYRIGHT,
      social: LV_APP_FOOTER_SOCIAL,
    };
  });
  getSocialIcon(icon: string | undefined): IconKeys {
    return (icon as IconKeys) || 'link';
  }
}
