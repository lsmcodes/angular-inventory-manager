import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductService } from '../services/product.service';

export const productResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const productService: ProductService = inject(ProductService);

  if (route.params && route.params['id']) {
    return productService.loadProductById(route.params['id']);
  }
  return {id: '', code: '', name: '', price: '', quantity: ''};
};
