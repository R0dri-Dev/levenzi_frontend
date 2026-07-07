import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvErrorTemplateComponent } from './error-template';

describe('LvErrorTemplateComponent', () => {
  let component: LvErrorTemplateComponent;
  let fixture: ComponentFixture<LvErrorTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvErrorTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvErrorTemplateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
