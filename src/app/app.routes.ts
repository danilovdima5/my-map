import { Routes } from '@angular/router';
import { PAGES_PATHS } from '@pages/paths';

export const routes: Routes = [
  {
    path: PAGES_PATHS.AUTH,
    loadComponent: () =>
      import('./pages/auth/auth-page.component').then(
        (c) => c.AuthPageComponent
      ),
  },
  {
    path: PAGES_PATHS.MAIN,
    loadComponent: () =>
      import('./pages/main/main-page.component').then(
        (c) => c.MainPageComponent
      ),
  },
];
