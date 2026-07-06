import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LvButtonComponent } from '../../atoms/button/button';

import {
  LV_ERROR_TEMPLATE_BASE,
  LV_ERROR_TEMPLATE_CONTAINER,
  LV_ERROR_TEMPLATE_CODE,
  LV_ERROR_TEMPLATE_VARIANTS,
  LV_ERROR_TEMPLATE_TITLE,
  LV_ERROR_TEMPLATE_MESSAGE,
  LV_ERROR_TEMPLATE_ACTIONS,
} from '../../../theme/error-template.theme';
import type { ErrorTemplateVariant, ErrorTemplateSize } from '../../../types/error-template.types';
import { LvIconComponent } from '../../icons/icon/icon';

@Component({
  selector: 'lv-error-template',
  standalone: true,
  imports: [CommonModule, RouterModule, LvButtonComponent, LvIconComponent],
  templateUrl: './error-template.html',
  styleUrl: './error-template.css',
})
export class LvErrorTemplateComponent {
  readonly variant = input<ErrorTemplateVariant>('default');
  readonly size = input<ErrorTemplateSize>('md');
  readonly code = input<string>('404');
  readonly title = input<string>('Página no encontrada');
  readonly message = input<string>('Lo sentimos, la página que buscas no existe.');
  readonly showHomeButton = input(true);
  readonly homeRoute = input<string>('/');

  readonly onAction = output<void>();

  readonly classes = computed(() => {
    const base = LV_ERROR_TEMPLATE_BASE;
    const container = LV_ERROR_TEMPLATE_CONTAINER;
    const code = [LV_ERROR_TEMPLATE_CODE, LV_ERROR_TEMPLATE_VARIANTS[this.variant()]].filter(Boolean).join(' ');

    return {
      template: base,
      container: container,
      code: code,
      title: LV_ERROR_TEMPLATE_TITLE,
      message: LV_ERROR_TEMPLATE_MESSAGE,
      actions: LV_ERROR_TEMPLATE_ACTIONS,
    };
  });

  getErrorIcon(): string {
    const map: Record<ErrorTemplateVariant, string> = {
      '404': 'search',
      '500': 'alert-triangle',
      '403': 'shield-off',
      default: 'alert-circle',
    };
    return map[this.variant()];
  }

  handleAction(): void {
    this.onAction.emit();
  }
}
