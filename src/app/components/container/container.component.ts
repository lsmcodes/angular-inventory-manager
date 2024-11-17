import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, tap } from 'rxjs';
import { ProductPage } from '../../model/product-page';
import { ProductService } from '../../services/product.service';
import { ProductTableComponent } from '../product-table/product-table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(
    pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 5 }
  ): void {
    this.products$ = this.productService
      .getProducts(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap(() => {
          (this.pageIndex = pageEvent.pageIndex),
            (this.pageSize = pageEvent.pageSize);
        })
      );
  }

  onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(product: Product): void {
    this.router.navigate(['edit', product.id], { relativeTo: this.route });
  }

  onDelete(product: Product): void {
    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        this.loadProducts(),
        this.snackBar.open('Produto excluído com sucesso', 'Ok', {duration: 5000});
      },
    });
  }
}
