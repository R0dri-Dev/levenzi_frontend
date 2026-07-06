import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvLoginFormComponent } from './login-form';

describe('LvLoginFormComponent', () => {
  let component: LvLoginFormComponent;
  let fixture: ComponentFixture<LvLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvLoginFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvLoginFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
