import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvRegisterFormComponent } from './register-form';

describe('LvRegisterFormComponent', () => {
  let component: LvRegisterFormComponent;
  let fixture: ComponentFixture<LvRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvRegisterFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvRegisterFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
