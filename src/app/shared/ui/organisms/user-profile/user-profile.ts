import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvAvatarComponent } from '../../atoms/avatar/avatar';
import { LvHeadingComponent } from '../../atoms/heading/heading';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvButtonComponent } from '../../atoms/button/button';
import { LvBadgeComponent } from '../../atoms/badge/badge';
import { LvDividerComponent } from '../../atoms/divider/divider';
import { LvCardComponent } from '../../atoms/card/card';
import { LvStatsPanelComponent } from '../stats-panel/stats-panel';
import { LvSize, LvColorVariant } from '../../../types';
import { UserRole, USER_ROLE_COLORS } from '../../../enum/roles.enum';
import type { UserProfileData, UserProfileStat } from '../../../interfaces/user-profile.interface';
import type { StatItem } from '../../../interfaces/stats-panel.interface';

@Component({
  selector: 'lv-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LvIconComponent,
    LvAvatarComponent,
    LvHeadingComponent,
    LvParagraphComponent,
    LvButtonComponent,
    LvBadgeComponent,
    LvDividerComponent,
    LvCardComponent,
    LvStatsPanelComponent,
  ],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css'],
})
export class LvUserProfileComponent {
  readonly user = input.required<UserProfileData>();
  readonly stats = input<UserProfileStat[]>([]);
  readonly size = input<LvSize>('md');
  readonly showActions = input(true);
  readonly showStats = input(true);
  readonly showDetails = input(true);
  readonly showBio = input(true);

  readonly onEdit = output<void>();
  readonly onMessage = output<void>();
  readonly onFollow = output<void>();

  handleEdit(): void {
    this.onEdit.emit();
  }

  handleMessage(): void {
    this.onMessage.emit();
  }

  handleFollow(): void {
    this.onFollow.emit();
  }

  getInitials(): string {
    const user = this.user();
    const name = user.name;
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
  }

  getRoleColor(): LvColorVariant {
    const role = this.user().role;
    if (!role) return 'primary';
    const colorMap: Record<UserRole, LvColorVariant> = {
      [UserRole.ADMIN]: 'danger',
      [UserRole.MANAGER]: 'warning',
      [UserRole.USER]: 'primary',
      [UserRole.GUEST]: 'neutral',
    };
    return colorMap[role] || 'primary';
  }

  convertStatsToStatItems(): StatItem[] {
    return this.stats().map(stat => ({
      title: stat.label,
      value: stat.value,
      icon: stat.icon,
      variant: stat.variant || 'primary',
      trend: stat.trend,
      trendValue: stat.trendValue,
      description: stat.description,
    }));
  }
}
