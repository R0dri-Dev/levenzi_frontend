import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvEmptyStateComponent } from './empty-state';

describe('EmptyState', () => {
  let component: LvEmptyStateComponent;
  let fixture: ComponentFixture<LvEmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvEmptyStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvEmptyStateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
