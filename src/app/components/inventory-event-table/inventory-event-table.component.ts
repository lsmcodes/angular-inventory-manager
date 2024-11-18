import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { InventoryEvent } from '../../model/inventory-event';

@Component({
  selector: 'app-inventory-event-table',
  standalone: true,
  imports: [DatePipe, MatTableModule, MatButtonModule],
  templateUrl: './inventory-event-table.component.html',
  styleUrl: './inventory-event-table.component.scss',
})
export class InventoryEventTableComponent {
  @Input() inventoryEvents: InventoryEvent[] = [];
  @Output() add: EventEmitter<boolean> = new EventEmitter(false);

  displayedColumns: string[] = ['eventType', 'product', 'quantity', 'createdAt', 'actions'];

  onAdd(): void {
    this.add.emit(true);
  }
}
