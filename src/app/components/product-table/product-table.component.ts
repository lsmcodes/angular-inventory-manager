import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../../model/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CurrencyPipe, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Output() add: EventEmitter<boolean> = new EventEmitter(false);
  @Output() edit: EventEmitter<Product> = new EventEmitter(false);
  @Output() delete: EventEmitter<Product> = new EventEmitter(false);

  displayedColumns: string[] = ['code', 'name', 'price', 'quantity', 'subtotal', 'actions'];

  getTotalCost(): number {
    let total = 0;
    this.products.forEach((product) => total += (product.price * product.quantity));
    return total;
  }

  onAdd(): void {
    this.add.emit(true);
  }

  onEdit(product: Product): void {
    this.edit.emit(product);
  }

  onDelete(product: Product): void {
    this.delete.emit(product);
  }
}
