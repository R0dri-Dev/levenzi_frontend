import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvStatsPanelComponent } from './stats-panel';

describe('LvStatsPanelComponent', () => {
  let component: LvStatsPanelComponent;
  let fixture: ComponentFixture<LvStatsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvStatsPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvStatsPanelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
