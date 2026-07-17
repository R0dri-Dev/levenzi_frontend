import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DetailItem {
  label: string;
  value: any;
  flag?: string; // iso2 en minúsculas, opcional
}

@Component({
  selector: 'lv-detail-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-list.html',
  styleUrls: ['./detail-list.css'],
})
export class LvDetailListComponent {
  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly items = input<DetailItem[]>([]);
}
