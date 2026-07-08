import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvLoadingComponent } from './loading';

describe('LvLoadingComponent', () => {
  let component: LvLoadingComponent;
  let fixture: ComponentFixture<LvLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvLoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvLoadingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
