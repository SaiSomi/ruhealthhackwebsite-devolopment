import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientoutcomesComponent } from './patientoutcomes.component';

describe('PatientoutcomesComponent', () => {
  let component: PatientoutcomesComponent;
  let fixture: ComponentFixture<PatientoutcomesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientoutcomesComponent]
    });
    fixture = TestBed.createComponent(PatientoutcomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
