import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import type { TopbarAction, TopbarUser } from '../../../interfaces/topbar.interface';
import { LvLogoComponent, LvIconButtonComponent } from "../../atoms";
import { LvSearchBoxComponent } from "../../molecules";
import { LvNotificationsPanelComponent } from "../notifications-panel/notifications-panel";
import { LvProfileDropdownComponent } from "../profile-dropdown/profile-dropdown";

@Component({
  selector: 'lv-topbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LvLogoComponent,
    LvIconButtonComponent,
    LvSearchBoxComponent,
    LvNotificationsPanelComponent,
    LvProfileDropdownComponent
  ],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.css'],
})
export class LvTopbarComponent {
  readonly brand = input<string>('Levenzi');
  readonly brandRoute = input<string>('/');
  readonly user = input<TopbarUser>();
  readonly actions = input<TopbarAction[]>([]);
  readonly showSearch = input(false);
  readonly showNotifications = input(true);
  readonly showProfile = input(true);
  readonly showMobileMenu = input(true);

  readonly onMenuToggle = output<void>();
  readonly onSearch = output<string>();
  readonly onNotificationClick = output<void>();
  readonly onProfileAction = output<string>();

  readonly mobileOpen = signal(false);

  toggleMobile(): void {
    this.mobileOpen.update(v => !v);
    this.onMenuToggle.emit();
  }

  handleSearch(query: string): void {
    this.onSearch.emit(query);
  }

  handleNotificationClick(): void {
    this.onNotificationClick.emit();
  }

  handleProfileAction(action: string): void {
    this.onProfileAction.emit(action);
  }
}
