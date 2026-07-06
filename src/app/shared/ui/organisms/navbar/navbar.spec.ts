import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvNavbarComponent } from './navbar';

describe('LvNavbarComponent', () => {
  let component: LvNavbarComponent;
  let fixture: ComponentFixture<LvNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvNavbarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
