import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';
import { ForgotPassword } from './features/auth/pages/forgot-password/forgot-password';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { Dashboard } from './features/dashboard/pages/dashboard/dashboard';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: Login,
        canActivate: [guestGuard],
      },
      {
        path: 'register',
        component: Register,
        canActivate: [guestGuard],
      },
      {
        path: 'forgot-password',
        component: ForgotPassword,
        canActivate: [guestGuard],
      },
    ],
  },
  {
    path: '',
    component: DashboardLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./features/usuarios/pages/index/index').then((m) => m.Index),
        canActivate: [authGuard],
      },
      {
        path: 'sedes',
        loadComponent: () => import('./features/sedes/pages/index/index').then((m) => m.Index),
        canActivate: [authGuard],
      },
      {
        path: 'companias',
        loadComponent: () => import('./features/companias/pages/index/index').then((m) => m.Index),
        canActivate: [authGuard],
      },
      {
        path: 'company',
        pathMatch: 'full',
        redirectTo: 'companias',
      },
      {
        path: 'clientes',
        loadComponent: () => import('./features/clientes/pages/index/index').then((m) => m.Index),
        canActivate: [authGuard],
      },
      {
        path: 'doctores',
        loadComponent: () => import('./features/doctores/pages/index/index').then((m) => m.Index),
        canActivate: [authGuard],
      },
      {
        path: 'marcas',
        loadComponent: () => import('./features/marcas/pages/index/index').then((m) => m.Index),
        canActivate: [authGuard],
      },
      {
        path: 'instalaciones',
        loadComponent: () => import('./features/instalaciones/pages/index/index').then((m) => m.Index),
        canActivate: [authGuard],
      },
      {
        path: 'productos',
        loadComponent: () => import('./features/productos/pages/index/index').then((m) => m.Index),
        canActivate: [authGuard],
      },
      {
        path: 'ventas',
        loadComponent: () => import('./features/ventas/pages/index/index').then((m) => m.Index),
        canActivate: [authGuard],
      },
      {
        path: 'roles',
        loadComponent: () => import('./features/roles/pages/index/index').then((m) => m.Index),
        canActivate: [authGuard],
      },
      {
        path: 'permisos',
        loadComponent: () => import('./features/permisos/pages/index/index').then((m) => m.Index),
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
