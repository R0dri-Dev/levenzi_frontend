import { Component, computed, input, output, signal, HostListener, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import {
  LV_USER_MENU_BASE,
  LV_USER_MENU_TRIGGER,
  LV_USER_MENU_AVATAR,
  LV_USER_MENU_AVATAR_IMAGE,
  LV_USER_MENU_USER_INFO,
  LV_USER_MENU_USER_NAME,
  LV_USER_MENU_USER_EMAIL,
  LV_USER_MENU_DROPDOWN,
  LV_USER_MENU_DROPDOWN_ITEM,
  LV_USER_MENU_DROPDOWN_ITEM_DANGER,
  LV_USER_MENU_DROPDOWN_DIVIDER,
  LV_USER_MENU_DROPDOWN_HEADER,
} from '../../../theme/user-menu.theme';
import type { UserMenuItem, UserMenuUser } from '../../../types/user-menu.types';
import { LvIconComponent } from '../../icons/icon/icon';

@Component({
  selector: 'lv-user-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, LvIconComponent],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css',
})
export class LvUserMenuComponent {
  readonly user = input.required<UserMenuUser>();
  readonly items = input.required<UserMenuItem[]>();
  readonly showUserInfo = input(true);
  readonly showAvatar = input(true);

  readonly onItemClick = output<UserMenuItem>();

  private isOpen = signal(false);
  readonly dropdownRef = viewChild<ElementRef<HTMLElement>>('dropdown');

  readonly classes = computed(() => ({
    base: LV_USER_MENU_BASE,
    trigger: LV_USER_MENU_TRIGGER,
    avatar: LV_USER_MENU_AVATAR,
    avatarImage: LV_USER_MENU_AVATAR_IMAGE,
    userInfo: LV_USER_MENU_USER_INFO,
    userName: LV_USER_MENU_USER_NAME,
    userEmail: LV_USER_MENU_USER_EMAIL,
    dropdown: LV_USER_MENU_DROPDOWN,
    item: LV_USER_MENU_DROPDOWN_ITEM,
    itemDanger: LV_USER_MENU_DROPDOWN_ITEM_DANGER,
    divider: LV_USER_MENU_DROPDOWN_DIVIDER,
    header: LV_USER_MENU_DROPDOWN_HEADER,
  }));

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdown = this.dropdownRef()?.nativeElement;
    if (dropdown && !dropdown.contains(target)) {
      this.close();
    }
  }

  itemClass(item: UserMenuItem): string {
    return [this.classes().item, item.danger ? this.classes().itemDanger : ''].filter(Boolean).join(' ');
  }

  toggle(): void {
    this.isOpen.update(v => !v);
  }

  close(): void {
    this.isOpen.set(false);
  }

  handleItemClick(item: UserMenuItem): void {
    if (item.action) {
      item.action();
    }
    this.onItemClick.emit(item);
    this.close();
  }

  getInitials(): string {
    const user = this.user();
    if (user.initials) return user.initials;

    const name = user.name;
    if (!name) return '';

    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
  }
}
