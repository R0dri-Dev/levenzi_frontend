import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDate } from './filter-date';

describe('FilterDate', () => {
  let component: FilterDate;
  let fixture: ComponentFixture<FilterDate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterDate],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterDate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
