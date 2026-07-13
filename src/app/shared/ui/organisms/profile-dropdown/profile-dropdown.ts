import { Component, input, output, signal, HostListener, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvAvatarComponent } from '../../atoms/avatar/avatar';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvLinkComponent } from '../../atoms/link/link';
import { LvButtonComponent } from '../../atoms/button/button';
import { LvDividerComponent } from '../../atoms/divider/divider';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';
import type { ProfileMenuItem, ProfileUser } from '../../../interfaces/profile.interface';

@Component({
  selector: 'lv-profile-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LvIconComponent,
    LvParagraphComponent,
    LvLinkComponent,
    LvButtonComponent,
    LvDividerComponent,
  ],
  templateUrl: './profile-dropdown.html',
  styleUrls: ['./profile-dropdown.css'],
})
export class LvProfileDropdownComponent {
  readonly user = input.required<ProfileUser>();
  readonly items = input<ProfileMenuItem[]>([]);
  readonly showUserInfo = input(true);

  readonly onItemClick = output<ProfileMenuItem>();

  protected isOpen = signal(false);
  readonly dropdownRef = viewChild<ElementRef<HTMLElement>>('dropdown');

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdown = this.dropdownRef()?.nativeElement;
    if (dropdown && !dropdown.contains(target)) {
      this.close();
    }
  }

  toggle(): void {
    this.isOpen.update(v => !v);
  }

  close(): void {
    this.isOpen.set(false);
  }

  handleItemClick(item: ProfileMenuItem): void {
    if (item.divider) return;

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
