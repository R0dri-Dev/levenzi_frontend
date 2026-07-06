import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvUserMenuComponent } from './user-menu';

describe('LvUserMenuComponent', () => {
  let component: LvUserMenuComponent;
  let fixture: ComponentFixture<LvUserMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvUserMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvUserMenuComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
