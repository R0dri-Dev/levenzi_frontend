import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvIconComponent } from './icon';

describe('LvIconComponent', () => {
  let component: LvIconComponent;
  let fixture: ComponentFixture<LvIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvIconComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
