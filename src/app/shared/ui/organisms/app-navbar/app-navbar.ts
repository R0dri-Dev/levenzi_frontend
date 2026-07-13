import { Component, input, output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import type {
  NavbarLink,
  NavbarUser,
} from '../../../interfaces/app-navbar.interface';

import {
  LvIconButtonComponent,
  LvLinkComponent,
} from '../../atoms';

import {
  LvUserMenuComponent,
  LvBreadcrumbComponent,
} from '../../molecules';

import { LvIconComponent } from '../../icons/icon/icon';
import { BreadcrumbService } from '../../../../core/services/breadcrumb-service';

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
    LvBreadcrumbComponent,
  ],
  templateUrl: './app-navbar.html',
  styleUrls: ['./app-navbar.css'],
})
export class LvAppNavbarComponent {
  readonly links = input<NavbarLink[]>([]);
  readonly user = input<NavbarUser | null>(null);
  readonly showUserMenu = input(true);

  readonly onMenuToggle = output<void>();
  readonly onUserAction = output<string>();

  readonly mobileOpen = signal(false);

  private readonly breadcrumbService = inject(BreadcrumbService);

  readonly breadcrumbs = this.breadcrumbService.items;

  toggleMobile(): void {
    this.mobileOpen.update(v => !v);
    this.onMenuToggle.emit();
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  isActive(link: NavbarLink): boolean {
    return !!link.active;
  }

  handleUserAction(action: string): void {
    this.onUserAction.emit(action);
  }
}
