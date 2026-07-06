import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvBreadcrumbComponent } from './breadcrumb';

describe('Breadcrumb', () => {
  let component: LvBreadcrumbComponent;
  let fixture: ComponentFixture<LvBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvBreadcrumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvBreadcrumbComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
