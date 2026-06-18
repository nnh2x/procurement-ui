import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./platform/home/home.component').then((m) => m.PlatformHomeComponent),
  },
  {
    path: 'procurement',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/shell/shell.component').then((m) => m.ShellComponent),
    data: { service: 'procurement' },
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'purchase-requests',
        loadChildren: () =>
          import('./features/purchase-requests/pr.routes').then((m) => m.PR_ROUTES),
      },
      {
        path: 'vendors',
        loadChildren: () =>
          import('./features/vendors/vendor.routes').then((m) => m.VENDOR_ROUTES),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];
