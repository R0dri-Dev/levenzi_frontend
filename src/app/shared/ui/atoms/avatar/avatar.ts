import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { LvSize, LvStatus } from '../../../types';

@Component({
  selector: 'lv-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.html',
})
export class LvAvatarComponent {
  readonly src = input('');
  readonly alt = input('Avatar');
  readonly initials = input('');

  readonly size = input<LvSize>('md');
  readonly circle = input(true);
  readonly bordered = input(false);
  readonly status = input<LvStatus>('idle');
}
