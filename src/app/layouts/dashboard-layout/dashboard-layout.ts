import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Token } from '../../core/services/token';
import type { NavbarLink, NavbarUser } from '../../shared/interfaces/app-navbar.interface';
import type { AppSidebarItem } from '../../shared/interfaces/app-sidebar.interface';
import { LvAppNavbarComponent } from "../../shared/ui/organisms/app-navbar/app-navbar";
import { LvAppSidebarComponent } from '../../shared/ui/organisms/app-sidebar/app-sidebar';
import { LvDashboardTemplateComponent } from "../../shared/ui/templates/dashboard-template/dashboard-template";
import { LV_ROUTES } from '../../shared/constants/routes';
import { Auth } from '../../core/services/auth';
import { Menu } from '../../core/services/menu';
import { LvIconComponent } from '../../shared/ui/icons/icon/icon';


@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, LvAppNavbarComponent, LvAppSidebarComponent, LvDashboardTemplateComponent],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
  private readonly token = inject(Token);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  readonly navLinks = computed<NavbarLink[]>(() => [
    { label: 'Dashboard', route: LV_ROUTES.dashboard, icon: 'home' as any, active: true },
  ]);

  readonly navUser = computed<NavbarUser | null>(() => {
    // No tenemos nombre/email en el token actual; lo dejamos básico.
    if (!this.token.hasToken()) return null;
    return { name: 'Usuario', email: '' };
  });

  private readonly _sidebarItems = signal<AppSidebarItem[]>([
    { label: 'Dashboard', route: LV_ROUTES.dashboard, icon: 'home' as any, active: true },
  ]);

  readonly sidebarItems = computed(() => this._sidebarItems());

  private readonly menu = inject(Menu);

  private readonly _menuLoaded = signal(false);

  constructor() {
    effect(() => {
      if (!this.token.hasToken() || this._menuLoaded()) return;
      this._menuLoaded.set(true);
      this.menu.getMenu()
        .subscribe({
          next: (items: any[]) => {
            const raw = items ?? [];
            const normalizeRoute = (r: unknown): string | undefined => {
              if (typeof r !== 'string') return undefined;
              return r.startsWith('/') ? r : `/${r}`;
            };

            const mapped: AppSidebarItem[] = raw
              .map(it => ({
                label: it?.label,
                route: normalizeRoute(it?.route) ?? it?.route as string,
                icon: (it?.icon ?? 'home') as any,
                active: !!it?.active,
              }))
              // tu sidebar usa <lv-link [routerLink]="item.route">, así que no renderizamos items sin route
              .filter(i => typeof i.route === 'string' && i.route.length > 0);

            if (!mapped.some(i => i.route === LV_ROUTES.dashboard)) {
              mapped.unshift({ label: 'Dashboard', route: LV_ROUTES.dashboard, icon: 'home' as any, active: true });
            }
            const finalItems = mapped.length ? mapped : [{ label: 'Dashboard', route: LV_ROUTES.dashboard, icon: 'home' as any, active: true }];
            this._sidebarItems.set(finalItems);
          },
          error: () => {
            this._menuLoaded.set(true);
          },
        });
    });
  }

  private readonly loggingOut = signal(false);

  handleNavbarAction(action: string): void {
    if (action !== 'logout' || this.loggingOut()) return;
    this.loggingOut.set(true);
    this.auth
      .logout()
      .subscribe({
        next: () => {
          this.loggingOut.set(false);
          void this.router.navigateByUrl(LV_ROUTES.login);
        },
        error: () => {
          this.loggingOut.set(false);
          void this.router.navigateByUrl(LV_ROUTES.login);
        },
      });
  }

  onNavbarMenuToggle(): void {
    // Si más adelante quieres sincronizar el sidebar con el menú móvil, aquí va.
  }
}

