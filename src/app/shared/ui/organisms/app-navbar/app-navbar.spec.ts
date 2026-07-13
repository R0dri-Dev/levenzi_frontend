import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvAppNavbarComponent } from './app-navbar';

describe('LvAppNavbarComponent', () => {
  let component: LvAppNavbarComponent;
  let fixture: ComponentFixture<LvAppNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvAppNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvAppNavbarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
