import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IimeComponent } from './iime.component';

describe('IimeComponent', () => {
  let component: IimeComponent;
  let fixture: ComponentFixture<IimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IimeComponent]
    });
    fixture = TestBed.createComponent(IimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
