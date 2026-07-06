import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvModalComponent } from './modal';

describe('LvModalComponent', () => {
  let component: LvModalComponent;
  let fixture: ComponentFixture<LvModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
