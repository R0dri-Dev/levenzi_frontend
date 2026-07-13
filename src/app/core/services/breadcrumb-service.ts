import { Injectable, signal } from '@angular/core';
import { BreadcrumbItem } from '../../shared/interfaces/breadcrumb.interface';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  readonly items = signal<BreadcrumbItem[]>([]);

  set(items: BreadcrumbItem[]) {
    this.items.set(items);
  }

  clear() {
    this.items.set([]);
  }
}
