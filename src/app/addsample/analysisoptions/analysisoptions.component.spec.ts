import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisoptionsComponent } from './analysisoptions.component';

describe('AnalysisoptionsComponent', () => {
  let component: AnalysisoptionsComponent;
  let fixture: ComponentFixture<AnalysisoptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisoptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
