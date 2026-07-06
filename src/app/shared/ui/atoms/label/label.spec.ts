import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvLabelComponent } from './label';

describe('LvLabelComponent', () => {
  let component: LvLabelComponent;
  let fixture: ComponentFixture<LvLabelComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvLabelComponent);

    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default props', () => {
    expect(component.text()).toBe('');
    expect(component.for()).toBe('');
    expect(component.variant()).toBe('primary');
    expect(component.size()).toBe('md');
    expect(component.disabled()).toBe(false);
  });

  it('should compute classes', () => {
    expect(component.classes()).toContain('font-medium');
  });
});

