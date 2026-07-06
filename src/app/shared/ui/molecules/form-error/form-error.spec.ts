import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvFormErrorComponent } from './form-error';

describe('LvFormErrorComponent', () => {
  let component: LvFormErrorComponent;
  let fixture: ComponentFixture<LvFormErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvFormErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvFormErrorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
