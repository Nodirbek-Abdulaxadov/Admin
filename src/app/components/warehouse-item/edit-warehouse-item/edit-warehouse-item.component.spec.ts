import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWarehouseItemComponent } from './edit-warehouse-item.component';

describe('EditWarehouseItemComponent', () => {
  let component: EditWarehouseItemComponent;
  let fixture: ComponentFixture<EditWarehouseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWarehouseItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWarehouseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
