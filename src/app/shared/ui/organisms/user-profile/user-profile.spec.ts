import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvUserProfileComponent } from './user-profile';

describe('LvUserProfileComponent', () => {
  let component: LvUserProfileComponent;
  let fixture: ComponentFixture<LvUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvUserProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvUserProfileComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
