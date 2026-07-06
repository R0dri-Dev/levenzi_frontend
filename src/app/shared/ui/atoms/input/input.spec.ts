import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvInputComponent } from './input';

describe('LvInputComponent', () => {
  let component: LvInputComponent;
  let fixture: ComponentFixture<LvInputComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

