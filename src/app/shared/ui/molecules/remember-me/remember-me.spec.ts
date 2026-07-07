import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvRememberMeComponent } from './remember-me';

describe('LvRememberMeComponent', () => {
  let component: LvRememberMeComponent;
  let fixture: ComponentFixture<LvRememberMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvRememberMeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvRememberMeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
