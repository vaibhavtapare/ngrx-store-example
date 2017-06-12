import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilltoComponent } from './billto.component';

describe('BilltoComponent', () => {
  let component: BilltoComponent;
  let fixture: ComponentFixture<BilltoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilltoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilltoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
