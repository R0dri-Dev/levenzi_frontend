import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvProfileCardComponent } from '../../molecules/profile-card/profile-card';
import { LvDetailListComponent, DetailItem } from '../../molecules/detail-list/detail-list';
import { LvColorVariant } from '../../../types';

@Component({
  selector: 'lv-detail-page',
  standalone: true,
  imports: [CommonModule, LvProfileCardComponent, LvDetailListComponent],
  templateUrl: './detail-page.html',
  styleUrls: ['./detail-page.css'],
})
export class LvDetailPageComponent {
  // Profile card
  readonly nombre = input.required<string>();
  readonly estadoLabel = input<string>('');
  readonly estadoVariant = input<LvColorVariant>('success');
  readonly telefono = input<string>('');
  readonly flagIso = input<string>('');

  // Detail list
  readonly listTitle = input<string>('');
  readonly listDescription = input<string>('');
  readonly items = input<DetailItem[]>([]);
}
