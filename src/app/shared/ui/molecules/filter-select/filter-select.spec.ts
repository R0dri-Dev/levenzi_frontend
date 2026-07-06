import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvFilterSelectComponent } from './filter-select';

describe('LvFilterSelectComponent', () => {
  let component: LvFilterSelectComponent;
  let fixture: ComponentFixture<LvFilterSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvFilterSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvFilterSelectComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
