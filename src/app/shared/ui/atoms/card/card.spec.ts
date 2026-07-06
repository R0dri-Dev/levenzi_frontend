import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvCardComponent } from './card';

describe('LvCardComponent', () => {
  let component: LvCardComponent;
  let fixture: ComponentFixture<LvCardComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [LvCardComponent],
    }).compileComponents();


    fixture = TestBed.createComponent(LvCardComponent);

    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
