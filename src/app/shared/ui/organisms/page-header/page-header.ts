import { Component, input, output, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvHeadingComponent } from '../../atoms/heading/heading';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvSearchBoxComponent } from '../../molecules/search-box/search-box';
import type { BreadcrumbItem } from '../../../interfaces/breadcrumb.interface';
import { LvColorVariant, LvTextAlign } from '../../../types';
import { BreadcrumbService } from '../../../../core/services/breadcrumb-service';

@Component({
  selector: 'lv-page-header',
  standalone: true,
  imports: [
    CommonModule,
    LvIconComponent,
    LvHeadingComponent,
    LvParagraphComponent,
    LvSearchBoxComponent,
  ],
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

  readonly showSearch = input<boolean>(false);
  readonly searchPlaceholder = input<string>('Buscar...');
  readonly searchValue = input<string>('');
  readonly searchChange = output<string>();
  readonly searchClear = output<void>();

  private readonly breadcrumbService = inject(BreadcrumbService);

  constructor() {
    effect(() => {
      this.breadcrumbService.set(this.breadcrumb());
    });
  }

  onSearch(value: string) {
    this.searchChange.emit(value);
  }

  onClear() {
    this.searchClear.emit();
  }
}
