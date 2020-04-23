import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import{MagneticInductionComponent} from './magnetic-induction-measurement.component';

describe('LightMeasurementComponent', () => {
  let component: MagneticInductionComponent;
  let fixture: ComponentFixture<MagneticInductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagneticInductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagneticInductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
