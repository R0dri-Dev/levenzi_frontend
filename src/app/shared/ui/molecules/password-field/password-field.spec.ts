import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvPasswordFieldComponent } from './password-field';

describe('LvPasswordFieldComponent', () => {
  let component: LvPasswordFieldComponent;
  let fixture: ComponentFixture<LvPasswordFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvPasswordFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvPasswordFieldComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
