import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightMeasurementComponent } from './light-measurement.component';

describe('LightMeasurementComponent', () => {
  let component: LightMeasurementComponent;
  let fixture: ComponentFixture<LightMeasurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightMeasurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
