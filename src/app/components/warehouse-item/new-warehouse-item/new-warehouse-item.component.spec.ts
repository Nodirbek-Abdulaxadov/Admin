import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWarehouseItemComponent } from './new-warehouse-item.component';

describe('NewWarehouseItemComponent', () => {
  let component: NewWarehouseItemComponent;
  let fixture: ComponentFixture<NewWarehouseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWarehouseItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWarehouseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
