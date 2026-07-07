import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvLoadingScreenComponent } from './loading-screen';

describe('LvLoadingScreenComponent', () => {
  let component: LvLoadingScreenComponent;
  let fixture: ComponentFixture<LvLoadingScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvLoadingScreenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvLoadingScreenComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
