import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvHeadingComponent } from '../../atoms/heading/heading';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvLogoComponent } from '../../atoms/logo/logo';
import { LvCardComponent } from '../../atoms/card/card';
import { LvSize, LvColorVariant, LvTextAlign } from '../../../types';

export type AuthTemplateVariant = 'centered' | 'split';

@Component({
  selector: 'lv-auth-template',
  standalone: true,
  imports: [
    CommonModule,
    LvHeadingComponent,
    LvParagraphComponent,
    LvLogoComponent,
    LvCardComponent,
  ],
  templateUrl: './auth-template.html',
  styleUrls: ['./auth-template.css'],
})
export class LvAuthTemplateComponent {
  readonly variant = input<AuthTemplateVariant>('centered');
  readonly size = input<LvSize>('md');
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly logo = input<string>('Levenzi');
  readonly logoUrl = input<string>('/');
  readonly backgroundImage = input<string>('');
  readonly showBranding = input(true);
  readonly color = input<LvColorVariant>('primary');
  readonly align = input<LvTextAlign>('center');
}
