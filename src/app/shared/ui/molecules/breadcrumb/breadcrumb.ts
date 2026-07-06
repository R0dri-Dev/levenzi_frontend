import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


import {
  LV_BREADCRUMB_BASE,
  LV_BREADCRUMB_ITEM,
  LV_BREADCRUMB_LINK,
  LV_BREADCRUMB_ACTIVE,
  LV_BREADCRUMB_SEPARATOR,
  LV_BREADCRUMB_ICON
} from '../../../theme/breadcrumb.theme';
import type { BreadcrumbItem } from '../../../types/breadcrumb.types';
import { LvIconComponent } from '../../icons/icon/icon';

@Component({
  selector: 'lv-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink, LvIconComponent],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class LvBreadcrumbComponent {
  readonly items = input.required<BreadcrumbItem[]>();
  readonly separator = input<string>('/');
  readonly homeIcon = input<boolean>(true);

  readonly classes = computed(() => ({
    base: LV_BREADCRUMB_BASE,
    item: LV_BREADCRUMB_ITEM,
    link: LV_BREADCRUMB_LINK,
    active: LV_BREADCRUMB_ACTIVE,
    separator: LV_BREADCRUMB_SEPARATOR,
    icon: LV_BREADCRUMB_ICON,
  }));
}
