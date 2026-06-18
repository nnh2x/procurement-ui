import { Routes } from '@angular/router';

export const PR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pr-list/pr-list.component').then((m) => m.PrListComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./pr-form/pr-form.component').then((m) => m.PrFormComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./pr-detail/pr-detail.component').then((m) => m.PrDetailComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./pr-form/pr-form.component').then((m) => m.PrFormComponent),
  },
];
