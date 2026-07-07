// src/app/shared/ui/organisms/navbar/navbar.ts
import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LvButtonComponent } from '../../atoms/button/button';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvUserMenuComponent } from '../../molecules/user-menu/user-menu';
import { LvSearchBoxComponent } from '../../molecules/search-box/search-box';

import {
  LV_NAVBAR_BASE,
  LV_NAVBAR_VARIANTS,
  LV_NAVBAR_POSITIONS,
  LV_NAVBAR_BRAND,
  LV_NAVBAR_ACTIONS,
  LV_NAVBAR_ITEM,
  LV_NAVBAR_ITEM_ACTIVE,
  LV_NAVBAR_MOBILE_BUTTON,
  LV_NAVBAR_DESKTOP_MENU,
  LV_NAVBAR_MOBILE_MENU,
} from '../../../theme/navbar.theme';
import type { NavbarVariant, NavbarPosition, NavbarItem, NavbarUser } from '../../../types/navbar.types';
import type { UserMenuItem, UserMenuUser } from '../../../types/user-menu.types';

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
  ],
  templateUrl: './navbar.html',
})
export class LvNavbarComponent {
  // ============ INPUTS ============
  readonly variant = input<NavbarVariant>('default');
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

  // ============ OUTPUTS ============
  readonly onMenuToggle = output<void>();
  readonly onItemClick = output<NavbarItem>();
  readonly onSearch = output<string>();
  readonly onUserAction = output<NavbarItem>();

  // ============ STATE ============
  readonly mobileOpen = signal(false);

  // ============ COMPUTED ============
  readonly classes = computed(() => {
    const base = LV_NAVBAR_BASE;
    const variant = LV_NAVBAR_VARIANTS[this.variant()] || '';
    const position = LV_NAVBAR_POSITIONS[this.position()] || '';

    return {
      navbar: [base, variant, position].filter(Boolean).join(' '),
      brand: LV_NAVBAR_BRAND,
      actions: LV_NAVBAR_ACTIONS,
      item: LV_NAVBAR_ITEM,
      itemActive: LV_NAVBAR_ITEM_ACTIVE,
      mobileButton: LV_NAVBAR_MOBILE_BUTTON,
      desktopMenu: LV_NAVBAR_DESKTOP_MENU,
      mobileMenu: LV_NAVBAR_MOBILE_MENU,
    };
  });

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

  // ✅ Convertir NavbarUser a UserMenuUser
  readonly convertedUser = computed((): UserMenuUser | undefined => {
    const user = this.user();
    if (!user) return undefined;
    return {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };
  });

  // ============ METHODS ============
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

  getItemClass(item: NavbarItem): string {
    const classes = [this.classes().item];
    if (this.isActive(item)) {
      classes.push(this.classes().itemActive);
    }
    return classes.filter(Boolean).join(' ');
  }

  handleSearch(query: string): void {
    this.onSearch.emit(query);
  }

  handleUserAction(item: UserMenuItem): void {
    const navbarItem: NavbarItem = {
      label: item.label,
      icon: item.icon,
      route: item.route,
      action: item.action,
      divider: item.divider,
      danger: item.danger,
    };
    this.onUserAction.emit(navbarItem);
  }
}
