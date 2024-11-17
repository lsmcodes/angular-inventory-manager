import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Product } from '../../model/product';
import { ProductPage } from '../../model/product-page';
import { ProductService } from '../../services/product.service';
import { InventoryEventTableComponent } from '../inventory-event-table/inventory-event-table.component';
import { ProductTableComponent } from '../product-table/product-table.component';
import { InventoryEventPage } from '../../model/inventory-event-page';
import { InventoryEventService } from '../../services/inventory-event.service';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    InventoryEventTableComponent,
    ProductTableComponent,
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent implements OnInit {
  products$: Observable<ProductPage> | null = null;
  inventoryEvents$: Observable<InventoryEventPage> | null = null;

  productPageIndex: number = 0;
  productPageSize: number = 5;

  constructor(
    private inventoryEventService: InventoryEventService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadInventoryEvents();
  }

  loadProducts(
    pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 5 }
  ): void {
    this.products$ = this.productService
      .getProducts(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap(() => {
          (this.productPageIndex = pageEvent.pageIndex),
            (this.productPageSize = pageEvent.pageSize);
        })
      );
  }

  onAddProduct(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEditProduct(product: Product): void {
    this.router.navigate(['edit', product.id], { relativeTo: this.route });
  }

  onDeleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        this.loadProducts(),
          this.snackBar.open('Produto excluído com sucesso', 'Ok', {
            duration: 5000,
          });
      },
    });
  }

  inventoryEventPageIndex: number = 0;
  inventoryEventPageSize: number = 5;

  loadInventoryEvents(
    pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 5 }
  ): void {
    this.inventoryEvents$ = this.inventoryEventService
      .getInventoryEvents(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap(() => {
          (this.inventoryEventPageIndex = pageEvent.pageIndex),
            (this.inventoryEventPageSize = pageEvent.pageSize);
        })
      );
  }
}
