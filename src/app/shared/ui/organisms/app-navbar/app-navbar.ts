import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import type { NavbarLink, NavbarUser } from '../../../interfaces/app-navbar.interface';
import { LvIconButtonComponent, LvLinkComponent, LvLogoComponent } from "../../atoms";
import { LvUserMenuComponent } from "../../molecules";
import { LvIconComponent } from "../../icons/icon/icon";

@Component({
  selector: 'lv-app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LvIconButtonComponent,
    LvUserMenuComponent,
    LvLinkComponent,
    LvIconComponent,
    LvLogoComponent
  ],
  templateUrl: './app-navbar.html',
  styleUrls: ['./app-navbar.css'],
})
export class LvAppNavbarComponent {
  readonly brand = input<string>('Levenzi');
  readonly brandRoute = input<string>('/');
  readonly links = input<NavbarLink[]>([]);
  readonly user = input<NavbarUser | null>(null);
  readonly showUserMenu = input(true);

  readonly onMenuToggle = output<void>();
  readonly onUserAction = output<string>();

  mobileOpen = signal(false);

  toggleMobile(): void {
    this.mobileOpen.update(v => !v);
    this.onMenuToggle.emit();
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  isActive(link: NavbarLink): boolean {
    return link.active || false;
  }

  handleUserAction(action: string): void {
    this.onUserAction.emit(action);
  }
}
