import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvFilterDateComponent } from './filter-date';

describe('FilterDate', () => {
  let component: LvFilterDateComponent;
  let fixture: ComponentFixture<LvFilterDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvFilterDateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvFilterDateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
