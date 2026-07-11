import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvToastContainerComponent } from './toast-container';

describe('LvToastContainerComponent', () => {
  let component: LvToastContainerComponent;
  let fixture: ComponentFixture<LvToastContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvToastContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvToastContainerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
