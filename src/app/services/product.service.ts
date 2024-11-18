import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, of, tap } from 'rxjs';
import { ProductPage } from '../model/product-page';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly API = '/api/products';

  private cache: Product[] = [];

  constructor(private http: HttpClient) {}

  getProducts(page = 0, size = 5): Observable<ProductPage> {
    return this.http
      .get<ProductPage>(this.API, { params: { page, size } })
      .pipe(
        first(),
        tap((data) => {this.cache = data.content})
      );
  }

  saveProduct(product: Partial<Product>): Observable<Product> {
    if(product.id) {
      return this.updateProduct(product);
    }
    return this.createProduct(product);
  }

  loadProductById(id: string): Observable<Product> {
    if (this.cache.length > 0) {
      const foundProduct = this.cache.find(product => `${product.id}` == `${id}`);
      return foundProduct != null? of(foundProduct) : this.getProductById(id);
    }
    return this.getProductById(id);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.API}/${id}`).pipe(first());
  }

  getProductByCode(code: string): Observable<Product> {
    return this.http.get<Product>(`${this.API}/code/${code}`).pipe(first());
  }

  updateProduct(product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.API}/${product.id}`, product).pipe(first());
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.API, product).pipe(first());
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.API}/${id}`).pipe(first());
  }
}
