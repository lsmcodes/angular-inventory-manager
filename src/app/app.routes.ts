import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  {
    path: 'products',
    loadComponent: () =>
      import('./components/container/container.component').then(
        (mod) => mod.ContainerComponent
      ),
  },
];
