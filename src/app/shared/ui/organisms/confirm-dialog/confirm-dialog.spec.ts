import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvConfirmDialogComponent } from './confirm-dialog';

describe('LvConfirmDialogComponent', () => {
  let component: LvConfirmDialogComponent;
  let fixture: ComponentFixture<LvConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvConfirmDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvConfirmDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
