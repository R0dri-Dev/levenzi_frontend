import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvColorVariant } from '../../../types';

@Component({
  selector: 'lv-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag.html',
  styleUrls: ['./tag.css'],
})
export class LvTagComponent {
  readonly color = input<LvColorVariant>('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly outline = input(false);
  readonly rounded = input(false);
}
