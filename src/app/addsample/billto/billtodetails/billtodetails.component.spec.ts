import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilltodetailsComponent } from './billtodetails.component';

describe('BilltodetailsComponent', () => {
  let component: BilltodetailsComponent;
  let fixture: ComponentFixture<BilltodetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilltodetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilltodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
