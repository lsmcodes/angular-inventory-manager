import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryEventTableComponent } from './inventory-event-table.component';

describe('InventoryEventTableComponent', () => {
  let component: InventoryEventTableComponent;
  let fixture: ComponentFixture<InventoryEventTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryEventTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryEventTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
