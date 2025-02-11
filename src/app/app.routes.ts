import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '**',
    loadComponent: () =>
      import('./pages/auth/auth-page.component').then(
        (c) => c.AuthPageComponent
      ),
  },
];
