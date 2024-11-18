import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inventoryEventType',
  standalone: true,
})
export class InventoryEventTypePipe implements PipeTransform {
  transform(value: string): string {
    if (value == 'STOCK_IN') {
      return 'Entrada';
    }
    return 'Saída';
  }
}
