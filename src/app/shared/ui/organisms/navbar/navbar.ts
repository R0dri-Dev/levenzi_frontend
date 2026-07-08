import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LvButtonComponent } from '../../atoms/button/button';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvUserMenuComponent } from '../../molecules/user-menu/user-menu';
import { LvSearchBoxComponent } from '../../molecules/search-box/search-box';
import { LvLinkComponent } from '../../atoms/link/link';
import { LvDividerComponent } from '../../atoms/divider/divider';
import type { NavbarItem, NavbarUser } from '../../../interfaces/navbar.interface';
import { UserMenuItem, UserMenuUser } from '../../../interfaces/user.interface';

export type NavbarPosition = 'static' | 'sticky' | 'fixed';

@Component({
  selector: 'lv-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LvIconComponent,
    LvIconButtonComponent,
    LvButtonComponent,
    LvParagraphComponent,
    LvUserMenuComponent,
    LvSearchBoxComponent,
    LvLinkComponent,
    LvDividerComponent,
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class LvNavbarComponent {
  readonly position = input<NavbarPosition>('sticky');
  readonly brand = input<string>('');
  readonly brandIcon = input<string>('');
  readonly brandRoute = input<string>('/');
  readonly items = input<NavbarItem[]>([]);
  readonly user = input<NavbarUser>();
  readonly userMenuItems = input<NavbarItem[]>([]);
  readonly showSearch = input(false);
  readonly showUserMenu = input(true);
  readonly showMobileMenu = input(true);

  readonly onMenuToggle = output<void>();
  readonly onItemClick = output<NavbarItem>();
  readonly onSearch = output<string>();
  readonly onUserAction = output<NavbarItem>();

  readonly mobileOpen = signal(false);

  readonly convertedUserMenuItems = computed((): UserMenuItem[] => {
    return this.userMenuItems().map(item => ({
      label: item.label,
      icon: item.icon,
      route: item.route,
      action: item.action,
      divider: item.divider || false,
      danger: item.danger || false,
    }));
  });

  readonly convertedUser = computed((): UserMenuUser | undefined => {
    const user = this.user();
    if (!user) return undefined;
    return {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };
  });

  toggleMobileMenu(): void {
    this.mobileOpen.update(v => !v);
    this.onMenuToggle.emit();
  }

  handleItemClick(item: NavbarItem): void {
    if (item.action) {
      item.action();
    }
    this.onItemClick.emit(item);
    if (this.mobileOpen()) {
      this.mobileOpen.set(false);
    }
  }

  isActive(item: NavbarItem): boolean {
    return item.active || false;
  }

  handleSearch(query: string): void {
    this.onSearch.emit(query);
  }

  handleUserAction(item: UserMenuItem): void {
    const navbarItem: NavbarItem = {
      label: item.label || '',
      icon: item.icon,
      route: item.route,
      action: item.action,
      divider: item.divider,
      danger: item.danger,
    };
    this.onUserAction.emit(navbarItem);
  }
}
