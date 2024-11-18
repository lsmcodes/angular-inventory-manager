import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryEventFormComponent } from './inventory-event-form.component';

describe('InventoryEventFormComponent', () => {
  let component: InventoryEventFormComponent;
  let fixture: ComponentFixture<InventoryEventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryEventFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
