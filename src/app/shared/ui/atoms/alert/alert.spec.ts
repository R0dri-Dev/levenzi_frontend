import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvAlertComponent } from './alert';

describe('LvAlertComponent', () => {
  let component: LvAlertComponent;
  let fixture: ComponentFixture<LvAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvAlertComponent);
    component = fixture.componentInstance;


    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

