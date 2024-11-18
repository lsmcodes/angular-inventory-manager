import { Routes } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { productResolver } from './resolver/product.resolver';
import { InventoryEventFormComponent } from './components/inventory-event-form/inventory-event-form.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'produtos' },
  {
    path: 'produtos',
    loadComponent: () =>
      import('./components/container/container.component').then(
        (mod) => mod.ContainerComponent
      ),
  },
  {
    path: 'produtos/criar',
    component: ProductFormComponent,
    resolve: { product: productResolver },
  },
  {
    path: 'produtos/editar/:id',
    component: ProductFormComponent,
    resolve: { product: productResolver },
  },
  {
    path: 'produtos/movimentacoes/criar',
    component: InventoryEventFormComponent
  }
];
