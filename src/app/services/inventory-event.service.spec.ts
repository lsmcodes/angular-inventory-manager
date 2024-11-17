import { TestBed } from '@angular/core/testing';

import { InventoryEventService } from './inventory-event.service';

describe('InventoryEventService', () => {
  let service: InventoryEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
