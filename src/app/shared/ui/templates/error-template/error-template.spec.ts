import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorTemplate } from './error-template';

describe('ErrorTemplate', () => {
  let component: ErrorTemplate;
  let fixture: ComponentFixture<ErrorTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorTemplate],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorTemplate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
