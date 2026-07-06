import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvPasswordInputComponent } from './password-input';

describe('LvPasswordInputComponent', () => {
  let component: LvPasswordInputComponent;
  let fixture: ComponentFixture<LvPasswordInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvPasswordInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvPasswordInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default name/placeholder/value as empty strings', () => {
    expect(component.name()).toBe('');
    expect(component.placeholder()).toBe('');
    expect(component.value()).toBe('');
  });

  it('should compute classes', () => {
    expect(component.classes()).toContain('rounded-xl');
  });
});

