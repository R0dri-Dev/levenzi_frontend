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
        path: 'sedes',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./features/sedes/pages/index/index').then((m) => m.Index),
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./features/sedes/pages/create/create').then((m) => m.CreateSede),
          },
          {
            path: ':id/edit',
            loadComponent: () =>
              import('./features/sedes/pages/edit/edit').then((m) => m.EditSede),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./features/sedes/pages/detail/detail').then((m) => m.DetailSede),
          },
        ],
      },
      {
        path: 'usuarios',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () => import('./features/usuarios/pages/index/index').then((m) => m.Index),
          },
          {
            path: 'create',
            loadComponent: () => import('./features/usuarios/pages/create/create').then((m) => m.CreateUser),
          },
          {
            path: ':id/edit',
            loadComponent: () => import('./features/usuarios/pages/edit/edit').then((m) => m.EditUser),
          },
          {
            path: ':id',
            loadComponent: () => import('./features/usuarios/pages/detail/detail').then((m) => m.DetailUser),
          },
        ],
      },

      {
        path: 'companias',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () => import('./features/companias/pages/index/index').then((m) => m.Index),
          },
          {
            path: 'create',
            loadComponent: () => import('./features/companias/pages/create-page/create-page').then((m) => m.CreateCompaniaPage),
          },
          {
            path: ':id/edit',
            loadComponent: () => import('./features/companias/pages/edit-page/edit-page').then((m) => m.EditCompaniaPage),
          },
          {
            path: ':id',
            loadComponent: () => import('./features/companias/pages/detail-page/detail-page').then((m) => m.DetailCompaniaPage),
          },
        ],
      },
      {
        path: 'company',
        pathMatch: 'full',
        redirectTo: 'companias',
      },
      {
        path: 'clientes',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () => import('./features/clientes/pages/index/index').then((m) => m.Index),
          },
          {
            path: 'create',
            loadComponent: () => import('./features/clientes/pages/create/create').then((m) => m.CreateCliente),
          },
          {
            path: ':id/edit',
            loadComponent: () => import('./features/clientes/pages/edit/edit').then((m) => m.EditCliente),
          },
          {
            path: ':id',
            loadComponent: () => import('./features/clientes/pages/detail/detail').then((m) => m.DetailCliente),
          },
        ],
      },

      {
        path: 'doctores',
        loadComponent: () => import('./features/doctores/pages/index/index').then((m) => m.Index),
        canActivate: [authGuard],
      },
      {
        path: 'marcas',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () => import('./features/marcas/pages/index/index').then((m) => m.Index),
          },
          {
            path: 'create',
            loadComponent: () => import('./features/marcas/pages/create/create').then((m) => m.CreateMarca),
          },
          {
            path: ':id/edit',
            loadComponent: () => import('./features/marcas/pages/edit/edit').then((m) => m.EditMarca),
          },
          {
            path: ':id',
            loadComponent: () => import('./features/marcas/pages/detail/detail').then((m) => m.DetailMarca),
          },
        ],
      },

      {
        path: 'instalaciones',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () => import('./features/instalaciones/pages/index/index').then((m) => m.Index),
          },
          {
            path: 'create',
            loadComponent: () => import('./features/instalaciones/pages/create/create').then((m) => m.CreateInstalacion),
          },
          {
            path: ':id/edit',
            loadComponent: () => import('./features/instalaciones/pages/edit/edit').then((m) => m.EditInstalacion),
          },
          {
            path: ':id',
            loadComponent: () => import('./features/instalaciones/pages/detail/detail').then((m) => m.DetailInstalacion),
          },
        ],
      },

      {
        path: 'productos',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () => import('./features/productos/pages/index/index').then((m) => m.Index),
          },
          {
            path: 'create',
            loadComponent: () => import('./features/productos/pages/create/create').then((m) => m.CreateProducto),
          },
          {
            path: ':id/edit',
            loadComponent: () => import('./features/productos/pages/edit/edit').then((m) => m.EditProducto),
          },
          {
            path: ':id',
            loadComponent: () => import('./features/productos/pages/detail/detail').then((m) => m.DetailProducto),
          },
        ],
      },

      {
        path: 'ventas',
        loadComponent: () => import('./features/ventas/pages/index/index').then((m) => m.Index),
        canActivate: [authGuard],
      },

      {
        path: 'modulos',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./features/modulos/pages/index/index').then((m) => m.Index),
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./features/modulos/pages/create/create').then((m) => m.CreateModulo),
          },
          {
            path: ':id/edit',
            loadComponent: () =>
              import('./features/modulos/pages/edit/edit').then((m) => m.EditModulo),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./features/modulos/pages/detail/detail').then((m) => m.DetailModulo),
          },
        ],
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

      {
        path: 'familias',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () => import('./features/familias/pages/index/index').then((m) => m.Index),
          },
          {
            path: 'create',
            loadComponent: () => import('./features/familias/pages/create/create').then((m) => m.CreateFamilia),
          },
          {
            path: ':id/edit',
            loadComponent: () => import('./features/familias/pages/edit/edit').then((m) => m.EditFamilia),
          },
          {
            path: ':id',
            loadComponent: () => import('./features/familias/pages/detail/detail').then((m) => m.DetailFamilia),
          },
        ],
      },

      {
        path: 'unidades-medida',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () => import('./features/unidades-medida/pages/index/index').then((m) => m.Index),
          },
          {
            path: 'create',
            loadComponent: () => import('./features/unidades-medida/pages/create/create').then((m) => m.CreateUnidadMedida),
          },
          {
            path: ':id/edit',
            loadComponent: () => import('./features/unidades-medida/pages/edit/edit').then((m) => m.EditUnidadMedida),
          },
          {
            path: ':id',
            loadComponent: () => import('./features/unidades-medida/pages/detail/detail').then((m) => m.DetailUnidadMedida),
          },
        ],
      },

      {
        path: 'tipos-unidad-medida',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () => import('./features/tipos-unidad-medida/pages/index/index').then((m) => m.Index),
          },
          {
            path: 'create',
            loadComponent: () => import('./features/tipos-unidad-medida/pages/create/create').then((m) => m.CreateTipoUnidadMedida),
          },
          {
            path: ':id/edit',
            loadComponent: () => import('./features/tipos-unidad-medida/pages/edit/edit').then((m) => m.EditTipoUnidadMedida),
          },
          {
            path: ':id',
            loadComponent: () => import('./features/tipos-unidad-medida/pages/detail/detail').then((m) => m.DetailTipoUnidadMedida),
          },
        ],
      },

      {
        path: 'producto-conversiones',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () => import('./features/producto-conversiones/pages/index/index').then((m) => m.Index),
          },
          {
            path: 'create',
            loadComponent: () => import('./features/producto-conversiones/pages/create/create').then((m) => m.CreateProductoConversion),
          },
          {
            path: ':id/edit',
            loadComponent: () => import('./features/producto-conversiones/pages/edit/edit').then((m) => m.EditProductoConversion),
          },
          {
            path: ':id',
            loadComponent: () => import('./features/producto-conversiones/pages/detail/detail').then((m) => m.DetailProductoConversion),
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];