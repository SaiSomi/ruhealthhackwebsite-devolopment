import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalhealthComponent } from './globalhealth.component';

describe('GlobalhealthComponent', () => {
  let component: GlobalhealthComponent;
  let fixture: ComponentFixture<GlobalhealthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalhealthComponent]
    });
    fixture = TestBed.createComponent(GlobalhealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
