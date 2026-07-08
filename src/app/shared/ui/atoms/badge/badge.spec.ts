import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvBadgeComponent } from './badge';

describe('LvBadgeComponent', () => {
  let component: LvBadgeComponent;
  let fixture: ComponentFixture<LvBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvBadgeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
