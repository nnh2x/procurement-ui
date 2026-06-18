import { Routes } from '@angular/router';

export const VENDOR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./vendor-list/vendor-list.component').then((m) => m.VendorListComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./vendor-form/vendor-form.component').then((m) => m.VendorFormComponent),
  },
];
