import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LvDividerOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'lv-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './divider.html',
  styleUrls: ['./divider.css'],
})
export class LvDividerComponent {
  readonly text = input('');
  readonly orientation = input<LvDividerOrientation>('horizontal');
}
