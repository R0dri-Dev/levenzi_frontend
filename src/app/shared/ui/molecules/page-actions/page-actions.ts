import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvAlign } from '../../../types';

@Component({
  selector: 'lv-page-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-actions.html',
  styleUrls: ['./page-actions.css'],
})
export class LvPageActionsComponent {
  readonly align = input<LvAlign>('end');
  readonly gap = input<'1' | '2' | '3' | '4' | '5'>('2');
}
