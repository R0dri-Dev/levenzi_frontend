import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvFiltersPanelComponent } from './filters-panel';

describe('LvFiltersPanelComponent', () => {
  let component: LvFiltersPanelComponent;
  let fixture: ComponentFixture<LvFiltersPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvFiltersPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvFiltersPanelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
