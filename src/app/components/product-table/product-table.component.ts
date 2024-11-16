import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
})
export class ProductTableComponent {
  @Input() products: Product[] = [];

  displayedColumns: string[] = ['code', 'name', 'price', 'quantity']
}
