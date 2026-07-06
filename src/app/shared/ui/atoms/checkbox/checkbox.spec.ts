import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvCheckboxComponent } from './checkbox';

describe('LvCheckboxComponent', () => {
  let component: LvCheckboxComponent;
  let fixture: ComponentFixture<LvCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvCheckboxComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
