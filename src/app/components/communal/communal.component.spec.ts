import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunalComponent } from './communal.component';

describe('CommunalComponent', () => {
  let component: CommunalComponent;
  let fixture: ComponentFixture<CommunalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
