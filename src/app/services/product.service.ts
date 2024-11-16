import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';
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
}
