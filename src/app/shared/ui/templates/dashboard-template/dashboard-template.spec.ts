import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvDashboardTemplateComponent } from './dashboard-template';

describe('LvDashboardTemplateComponent', () => {
  let component: LvDashboardTemplateComponent;
  let fixture: ComponentFixture<LvDashboardTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvDashboardTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvDashboardTemplateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
