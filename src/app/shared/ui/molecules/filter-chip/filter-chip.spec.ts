import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvFilterChipComponent } from './filter-chip';

describe('FilterChip', () => {
  let component: LvFilterChipComponent;
  let fixture: ComponentFixture<LvFilterChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvFilterChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvFilterChipComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
