import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterChip } from './filter-chip';

describe('FilterChip', () => {
  let component: FilterChip;
  let fixture: ComponentFixture<FilterChip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterChip],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterChip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
