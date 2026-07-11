import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvDynamicFormComponent } from './dynamic-form';

describe('LvDynamicFormComponent', () => {
  let component: LvDynamicFormComponent;
  let fixture: ComponentFixture<LvDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvDynamicFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvDynamicFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
