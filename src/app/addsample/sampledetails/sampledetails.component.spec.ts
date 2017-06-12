import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampledetailsComponent } from './sampledetails.component';

describe('SampledetailsComponent', () => {
  let component: SampledetailsComponent;
  let fixture: ComponentFixture<SampledetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampledetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampledetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
