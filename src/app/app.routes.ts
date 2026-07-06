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
        ],
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];
