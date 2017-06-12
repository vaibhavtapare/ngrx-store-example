import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionsummaryComponent } from './submissionsummary.component';

describe('SubmissionsummaryComponent', () => {
  let component: SubmissionsummaryComponent;
  let fixture: ComponentFixture<SubmissionsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
