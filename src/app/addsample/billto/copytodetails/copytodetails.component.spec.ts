import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopytodetailsComponent } from './copytodetails.component';

describe('CopytodetailsComponent', () => {
  let component: CopytodetailsComponent;
  let fixture: ComponentFixture<CopytodetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopytodetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopytodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
