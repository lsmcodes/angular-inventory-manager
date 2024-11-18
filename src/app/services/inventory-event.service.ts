import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { InventoryEvent } from '../model/inventory-event';
import { InventoryEventPage } from '../model/inventory-event-page';

@Injectable({
  providedIn: 'root',
})
export class InventoryEventService {
  private readonly API = '/api/inventory-events';

  constructor(private http: HttpClient) {}

  getInventoryEvents(page = 0, size = 5): Observable<InventoryEventPage> {
    return this.http
      .get<InventoryEventPage>(this.API, { params: { page, size , sortDirection: 'desc'} })
      .pipe(first());
  }

  createInventoryEvent(inventoryEvent: Partial<InventoryEvent>, productId: string) {
    return this.http
      .post<InventoryEvent>(`${this.API}/${productId}`, inventoryEvent)
      .pipe(first());
  }
}
