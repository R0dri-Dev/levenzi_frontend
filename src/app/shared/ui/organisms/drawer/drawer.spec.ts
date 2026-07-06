import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvDrawerComponent } from './drawer';

describe('LvDrawerComponent', () => {
  let component: LvDrawerComponent;
  let fixture: ComponentFixture<LvDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvDrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvDrawerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
