import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvFilterBarComponent } from './filter-bar';

describe('FilterBar', () => {
  let component: LvFilterBarComponent;
  let fixture: ComponentFixture<LvFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvFilterBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvFilterBarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
