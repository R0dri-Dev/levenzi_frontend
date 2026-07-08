import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvBreadcrumbComponent } from '../../molecules/breadcrumb/breadcrumb';
import { LvHeadingComponent } from '../../atoms/heading/heading';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvIconComponent } from '../../icons/icon/icon';
import type { BreadcrumbItem } from '../../../interfaces/breadcrumb.interface';
import { LvColorVariant, LvTextAlign } from '../../../types';

@Component({
  selector: 'lv-page-header',
  standalone: true,
  imports: [CommonModule, LvBreadcrumbComponent, LvIconComponent, LvHeadingComponent, LvParagraphComponent],
  templateUrl: './page-header.html',
  styleUrls: ['./page-header.css'],
})
export class LvPageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly align = input<LvTextAlign>('left');
  readonly icon = input<string>();
  readonly color = input<LvColorVariant>('primary');
  readonly breadcrumb = input<BreadcrumbItem[]>([]);
}
