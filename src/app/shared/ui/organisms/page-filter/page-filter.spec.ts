import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvPageFilterComponent } from './page-filter';

describe('LvPageFilterComponent', () => {
  let component: LvPageFilterComponent;
  let fixture: ComponentFixture<LvPageFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvPageFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvPageFilterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
