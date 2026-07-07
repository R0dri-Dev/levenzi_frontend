import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvFormTemplateComponent } from './form-template';

describe('LvFormTemplateComponent', () => {
  let component: LvFormTemplateComponent;
  let fixture: ComponentFixture<LvFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvFormTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvFormTemplateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
