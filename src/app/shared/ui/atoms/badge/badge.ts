import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvColorVariant } from '../../../types';

@Component({
  selector: 'lv-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.html',
  styleUrls: ['./badge.css'],
})
export class LvBadgeComponent {
  readonly text = input<string>('');
  readonly variant = input<LvColorVariant>('primary');
}
