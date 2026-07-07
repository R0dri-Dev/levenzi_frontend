import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvStatCardComponent } from './stat-card';

describe('LvStatCardComponent', () => {
  let component: LvStatCardComponent;
  let fixture: ComponentFixture<LvStatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvStatCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvStatCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
