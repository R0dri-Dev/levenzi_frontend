import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvSize, LvColorVariant } from '../../../types';

@Component({
  selector: 'lv-logo',
  standalone: true,
  imports: [CommonModule, RouterModule, LvIconComponent],
  templateUrl: './logo.html',
  styleUrls: ['./logo.css'],
})
export class LvLogoComponent {
  readonly text = input<string>('Levenzi');
  readonly size = input<LvSize>('md');
  readonly showIcon = input(true);
  readonly link = input<string>('/');
  readonly color = input<LvColorVariant>('primary');
  readonly bold = input(true);
}
