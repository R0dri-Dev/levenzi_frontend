import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvProfileDropdownComponent } from './profile-dropdown';

describe('LvProfileDropdownComponent', () => {
  let component: LvProfileDropdownComponent;
  let fixture: ComponentFixture<LvProfileDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvProfileDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvProfileDropdownComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
