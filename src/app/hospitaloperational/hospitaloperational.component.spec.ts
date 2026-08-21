import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitaloperationalComponent } from './hospitaloperational.component';

describe('HospitaloperationalComponent', () => {
  let component: HospitaloperationalComponent;
  let fixture: ComponentFixture<HospitaloperationalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitaloperationalComponent]
    });
    fixture = TestBed.createComponent(HospitaloperationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
