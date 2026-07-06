import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvDataFilterComponent } from './data-filter';

describe('LvDataFilterComponent', () => {
  let component: LvDataFilterComponent;
  let fixture: ComponentFixture<LvDataFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvDataFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvDataFilterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
