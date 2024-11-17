import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InventoryEvent } from '../../model/inventory-event';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-inventory-event-table',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './inventory-event-table.component.html',
  styleUrl: './inventory-event-table.component.scss',
})
export class InventoryEventTableComponent {
  @Input() inventoryEvents: InventoryEvent[] = [];
  @Output() add: EventEmitter<boolean> = new EventEmitter(false);

  displayedColumns: string[] = ['eventType', 'product', 'quantity', 'createdAt'];

  onAdd(): void {
    this.add.emit(true);
  }
}
