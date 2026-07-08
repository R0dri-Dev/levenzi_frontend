import { Component, input, output, signal, HostListener, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvAvatarComponent } from '../../atoms/avatar/avatar';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvLinkComponent } from '../../atoms/link/link';
import { LvDividerComponent } from '../../atoms/divider/divider';
import { LvButtonComponent } from '../../atoms/button/button';
import { UserMenuItem, UserMenuUser } from '../../../interfaces/user.interface';

@Component({
  selector: 'lv-user-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LvIconComponent,
    LvAvatarComponent,
    LvParagraphComponent,
    LvLinkComponent,
    LvDividerComponent,
    LvButtonComponent
  ],
  templateUrl: './user-menu.html',
  styleUrls: ['./user-menu.css'],
})
export class LvUserMenuComponent {
  readonly user = input.required<UserMenuUser>();
  readonly items = input.required<UserMenuItem[]>();
  readonly showUserInfo = input(true);
  readonly showAvatar = input(true);

  readonly onItemClick = output<UserMenuItem>();

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

  handleItemClick(item: UserMenuItem): void {
    if (item.action) {
      item.action();
    }
    this.onItemClick.emit(item);
    this.close();
  }
}
