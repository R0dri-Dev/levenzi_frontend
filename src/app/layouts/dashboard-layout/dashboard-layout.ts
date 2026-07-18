// features/dashboard-layout/dashboard-layout.ts
import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { Token } from '../../core/services/token';
import type { NavbarLink, NavbarUser } from '../../shared/interfaces/app-navbar.interface';
import type { AppSidebarItem } from '../../shared/interfaces/app-sidebar.interface';
import type { Toast } from '../../shared/interfaces/toast.interface';
import { LvAppNavbarComponent } from '../../shared/ui/organisms/app-navbar/app-navbar';
import { LvAppSidebarComponent } from '../../shared/ui/organisms/app-sidebar/app-sidebar';
import { LvToastContainerComponent } from '../../shared/ui/organisms/toast-container/toast-container';
import { LvDashboardTemplateComponent } from '../../shared/ui/templates/dashboard-template/dashboard-template';
import { LV_ROUTES } from '../../shared/constants/routes';
import { Auth } from '../../core/services/auth';
import { Menu } from '../../core/services/menu';
import { ToastService } from '../../core/services/toast';

export function normalizeSidebarMenuItems(rawItems: Array<Record<string, unknown>> | null | undefined, dashboardRoute: string): AppSidebarItem[] {
  const routeMap: Record<string, string> = {
    '/instalaciones': LV_ROUTES.instalaciones,
    '/productos': LV_ROUTES.productos,
    '/roles': LV_ROUTES.roles,
    '/permisos': LV_ROUTES.permisos,
    '/usuarios': LV_ROUTES.usuarios,
    '/sedes': LV_ROUTES.sedes,
    '/companias': LV_ROUTES.companias,
    '/clientes': LV_ROUTES.clientes,
    '/doctores': LV_ROUTES.doctores,
    '/marcas': LV_ROUTES.marcas,
    '/ventas': LV_ROUTES.ventas,
    '/dashboard': LV_ROUTES.dashboard,
    instalacion: LV_ROUTES.instalaciones,
    instalaciones: LV_ROUTES.instalaciones,
    producto: LV_ROUTES.productos,
    productos: LV_ROUTES.productos,
    rol: LV_ROUTES.roles,
    roles: LV_ROUTES.roles,
    permiso: LV_ROUTES.permisos,
    permisos: LV_ROUTES.permisos,
    usuario: LV_ROUTES.usuarios,
    usuarios: LV_ROUTES.usuarios,
    sede: LV_ROUTES.sedes,
    sedes: LV_ROUTES.sedes,
    compania: LV_ROUTES.companias,
    companias: LV_ROUTES.companias,
    cliente: LV_ROUTES.clientes,
    clientes: LV_ROUTES.clientes,
    doctor: LV_ROUTES.doctores,
    doctores: LV_ROUTES.doctores,
    marca: LV_ROUTES.marcas,
    marcas: LV_ROUTES.marcas,
    venta: LV_ROUTES.ventas,
    ventas: LV_ROUTES.ventas,
    dashboard: LV_ROUTES.dashboard,
  };

  const normalized = (rawItems ?? [])
    .map((item) => {
      const label = (item['label'] ?? item['title'] ?? item['name'] ?? '') as string;
      const icon = (item['icon'] as string | undefined) ?? 'home';
      const routeCandidate = (item['route'] ?? item['path'] ?? item['url'] ?? '') as string;
      const fallbackKey = (item['name'] ?? item['label'] ?? item['title'] ?? '') as string;
      const normalizedRouteCandidate = routeCandidate
        ? (routeCandidate.startsWith('/') ? routeCandidate : `/${routeCandidate}`)
        : fallbackKey
          ? (routeMap[fallbackKey.toLowerCase()] ?? undefined)
          : undefined;
      const finalRoute = normalizedRouteCandidate ? (routeMap[normalizedRouteCandidate] ?? normalizedRouteCandidate) : undefined;
      const labelMap: Record<string, string> = {
        instalaciones: 'Instalaciones',
        productos: 'Productos',
        roles: 'Roles',
        permisos: 'Permisos',
        usuarios: 'Usuarios',
        sedes: 'Sedes',
        companias: 'Compañías',
        clientes: 'Clientes',
        doctores: 'Doctores',
        marcas: 'Marcas',
        ventas: 'Ventas',
        dashboard: 'Dashboard',
      };

      const finalLabel = label || (normalizedRouteCandidate ? labelMap[normalizedRouteCandidate.replace(/^\//, '').toLowerCase()] ?? normalizedRouteCandidate.replace(/^\//, '') : 'Elemento');

      return {
        label: finalLabel,
        route: finalRoute,
        icon: (icon as AppSidebarItem['icon']) ?? 'home',
        active: Boolean(item['active']),
      } as AppSidebarItem;
    })
    .filter((item): item is AppSidebarItem => typeof item.route === 'string' && item.route.length > 0);

  if (!normalized.some((item) => item.route === dashboardRoute)) {
    normalized.unshift({ label: 'Dashboard', route: dashboardRoute, icon: 'home' as AppSidebarItem['icon'], active: false });
  }

  return normalized.length ? normalized : [{ label: 'Dashboard', route: dashboardRoute, icon: 'home' as AppSidebarItem['icon'], active: false }];
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    LvAppNavbarComponent,
    LvAppSidebarComponent,
    LvDashboardTemplateComponent,
    LvToastContainerComponent,
  ],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
  private readonly token = inject(Token);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly menu = inject(Menu);

  readonly toastService = inject(ToastService);

  readonly navLinks = computed<NavbarLink[]>(() => [
    { label: 'Dashboard', route: LV_ROUTES.dashboard, icon: 'home' as any, active: false },
  ]);

  readonly navUser = computed<NavbarUser | null>(() => {
    // No tenemos nombre/email en el token actual; lo dejamos básico.
    if (!this.token.hasToken()) return null;
    return { name: 'Usuario', email: '' };
  });

  private readonly _sidebarItems = signal<AppSidebarItem[]>([
    { label: 'Dashboard', route: LV_ROUTES.dashboard, icon: 'home' as any, active: false },
  ]);

  readonly sidebarItems = computed(() => this._sidebarItems());

  private readonly _menuLoaded = signal(false);

  constructor() {
    effect(() => {
      if (!this.token.hasToken() || this._menuLoaded()) return;
      this._menuLoaded.set(true);
      this.menu.getMenu()
        .subscribe({
          next: (items: any[]) => {
            const mapped = normalizeSidebarMenuItems(items, LV_ROUTES.dashboard);
            this._sidebarItems.set(mapped);
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

  handleToastClose(id: string | number): void {
    this.toastService.close(id);
  }

  handleToastAction(toast: Toast): void {
    // opcional: lógica extra al hacer click en la acción del toast
  }
}