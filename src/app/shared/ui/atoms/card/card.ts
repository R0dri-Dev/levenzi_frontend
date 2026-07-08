import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvRadius } from '../../../types';

@Component({
  selector: 'lv-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrls: ['./card.css'],
})
export class LvCardComponent {
  readonly headerText = input<string | null>(null);
  readonly footerText = input<string | null>(null);
  readonly rounded = input<LvRadius>('lg');
  readonly shadow = input<boolean>(true);
  readonly hoverable = input<boolean>(false);
  readonly bordered = input<boolean>(false);
}
