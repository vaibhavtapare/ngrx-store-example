import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageselectionComponent } from './packageselection.component';

describe('PackageselectionComponent', () => {
  let component: PackageselectionComponent;
  let fixture: ComponentFixture<PackageselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
