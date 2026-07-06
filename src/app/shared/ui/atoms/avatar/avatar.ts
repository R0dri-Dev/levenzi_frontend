import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { AvatarSize, AvatarStatus } from '../../../types/avatar.types';
import { LV_AVATAR_BASE, LV_AVATAR_RADIUS, LV_AVATAR_SIZES, LV_AVATAR_STATUS } from '../../../theme/avatar.theme';


@Component({
  selector: 'lv-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class LvAvatarComponent {

  readonly src = input('');

  readonly alt = input('Avatar');

  readonly initials = input('');

  readonly size = input<AvatarSize>('md');

  readonly circle = input(true);

  readonly bordered = input(false);

  readonly status = input<AvatarStatus>('none');

  readonly classes = computed(() => {

    return [
      LV_AVATAR_BASE,
      LV_AVATAR_SIZES[this.size()],
      this.circle()
        ? LV_AVATAR_RADIUS.circle
        : LV_AVATAR_RADIUS.rounded,
      this.bordered()
        ? 'ring-2 ring-white shadow'
        : '',
    ].join(' ');

  });

  readonly statusClass = computed(() => {

    return [
      'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white',
      LV_AVATAR_STATUS[this.status()],
    ].join(' ');

  });

}
