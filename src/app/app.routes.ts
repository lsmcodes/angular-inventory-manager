import { Routes } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { productResolver } from './resolver/product.resolver';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  {
    path: 'products',
    loadComponent: () =>
      import('./components/container/container.component').then(
        (mod) => mod.ContainerComponent
      ),
  },
  {
    path: 'products/new',
    component: ProductFormComponent,
    resolve: { product: productResolver },
  },
  {
    path: 'products/edit/:id',
    component: ProductFormComponent,
    resolve: { product: productResolver },
  },
];
