import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvDataTableComponent } from './data-table';

describe('LvDataTableComponent', () => {
  let component: LvDataTableComponent;
  let fixture: ComponentFixture<LvDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvDataTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvDataTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
