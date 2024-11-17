import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Output() add: EventEmitter<boolean> = new EventEmitter(false);
  @Output() edit: EventEmitter<Product> = new EventEmitter(false);
  @Output() delete: EventEmitter<Product> = new EventEmitter(false);

  displayedColumns: string[] = ['code', 'name', 'price', 'quantity', 'actions'];

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
