import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvButtonComponent } from '../../atoms/button/button';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvSize } from '../../../types';

@Component({
  selector: 'lv-pagination',
  standalone: true,
  imports: [CommonModule, LvButtonComponent, LvIconComponent],
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.css'],
})
export class LvPaginationComponent {
  readonly total = input.required<number>();
  readonly page = input.required<number>();
  readonly perPage = input<number>(10);
  readonly size = input<LvSize>('md');
  readonly showTotal = input<boolean>(true);

  readonly onPageChange = output<number>();

  readonly totalPages = computed(() => Math.ceil(this.total() / this.perPage()));

  readonly pages = computed(() => {
    const current = this.page();
    const total = this.totalPages();
    const pages: (number | string)[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (current > 3) {
        pages.push('...');
      }
      for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
        pages.push(i);
      }
      if (current < total - 2) {
        pages.push('...');
      }
      pages.push(total);
    }
    return pages;
  });

  readonly startItem = computed(() => ((this.page() - 1) * this.perPage()) + 1);
  readonly endItem = computed(() => Math.min(this.page() * this.perPage(), this.total()));

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.page()) return;
    this.onPageChange.emit(page);
  }

  previous(): void {
    this.goToPage(this.page() - 1);
  }

  next(): void {
    this.goToPage(this.page() + 1);
  }
}
