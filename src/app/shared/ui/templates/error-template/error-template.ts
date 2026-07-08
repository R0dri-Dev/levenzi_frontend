import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LvButtonComponent } from '../../atoms/button/button';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvHeadingComponent } from '../../atoms/heading/heading';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvSize, LvColorVariant, LvTextAlign } from '../../../types';

export type ErrorTemplateVariant = '404' | '500' | '403' | 'default';

@Component({
  selector: 'lv-error-template',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LvButtonComponent,
    LvHeadingComponent,
    LvParagraphComponent,
    LvIconComponent,
  ],
  templateUrl: './error-template.html',
  styleUrls: ['./error-template.css'],
})
export class LvErrorTemplateComponent {
  readonly variant = input<ErrorTemplateVariant>('default');
  readonly size = input<LvSize>('md');
  readonly code = input<string>('404');
  readonly title = input<string>('Página no encontrada');
  readonly message = input<string>('Lo sentimos, la página que buscas no existe.');
  readonly showHomeButton = input(true);
  readonly homeRoute = input<string>('/');
  readonly align = input<LvTextAlign>('center');
  readonly color = input<LvColorVariant>('primary');

  readonly onAction = output<void>();

  getErrorIcon(): string {
    const map: Record<ErrorTemplateVariant, string> = {
      '404': 'search',
      '500': 'alert-triangle',
      '403': 'shield-off',
      'default': 'alert-circle',
    };
    return map[this.variant()];
  }

  getCodeColor(): LvColorVariant {
    const map: Record<ErrorTemplateVariant, LvColorVariant> = {
      '404': 'warning',
      '500': 'danger',
      '403': 'danger',
      'default': 'neutral',
    };
    return map[this.variant()];
  }

  handleAction(): void {
    this.onAction.emit();
  }
}
