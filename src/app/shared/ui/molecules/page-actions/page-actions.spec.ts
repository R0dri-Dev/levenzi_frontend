import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvPageActionsComponent } from './page-actions';

describe('PageActions', () => {
  let component: LvPageActionsComponent;
  let fixture: ComponentFixture<LvPageActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvPageActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvPageActionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
