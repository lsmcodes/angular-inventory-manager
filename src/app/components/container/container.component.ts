import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, tap } from 'rxjs';
import { ProductPage } from '../../model/product-page';
import { ProductService } from '../../services/product.service';
import { ProductTableComponent } from '../product-table/product-table.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ProductTableComponent,
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent implements OnInit {
  products$: Observable<ProductPage> | null = null;

  pageIndex: number = 0;
  pageSize: number = 5;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(pageEvent: PageEvent = {length: 0, pageIndex: 0, pageSize: 5}): void {
    this.products$ = this.productService
      .getProducts(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(tap(() => {
        this.pageIndex = pageEvent.pageIndex,
        this.pageSize = pageEvent.pageSize
      }));
  }
}
