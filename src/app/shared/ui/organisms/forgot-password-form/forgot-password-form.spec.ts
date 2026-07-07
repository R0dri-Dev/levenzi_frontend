import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvForgotPasswordFormComponent } from './forgot-password-form';

describe('LvForgotPasswordFormComponent', () => {
  let component: LvForgotPasswordFormComponent;
  let fixture: ComponentFixture<LvForgotPasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvForgotPasswordFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvForgotPasswordFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
