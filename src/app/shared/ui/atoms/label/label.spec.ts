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
    expect(component.size()).toBe('md');
    expect(component.disabled()).toBe(false);
  });
});

