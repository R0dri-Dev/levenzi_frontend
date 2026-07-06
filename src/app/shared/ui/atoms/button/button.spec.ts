import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvButtonComponent  } from './button';

describe('Button', () => {
  let component: LvButtonComponent;
  let fixture: ComponentFixture<LvButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
