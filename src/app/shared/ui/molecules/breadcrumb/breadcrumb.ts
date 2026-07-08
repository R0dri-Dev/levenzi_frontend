import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvLinkComponent } from '../../atoms/link/link';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvColorVariant } from '../../../types';
import { BreadcrumbItem } from '../../../interfaces/breadcrumb.interface';

@Component({
  selector: 'lv-breadcrumb',
  standalone: true,
  imports: [CommonModule, LvLinkComponent, LvIconComponent],
  templateUrl: './breadcrumb.html',
  styleUrls: ['./breadcrumb.css'],
})
export class LvBreadcrumbComponent {
  readonly items = input.required<BreadcrumbItem[]>();
  readonly separator = input<string>('/');
  readonly homeIcon = input<boolean>(true);
  readonly color = input<LvColorVariant>('primary');
}
