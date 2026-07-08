import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lv-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton.html',
  styleUrls: ['./skeleton.css'],
})
export class LvSkeletonComponent {
  readonly width = input('100%');
  readonly height = input('1rem');
  readonly circle = input(false);
  readonly rounded = input<'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>('lg');
  readonly animated = input(true);
}
