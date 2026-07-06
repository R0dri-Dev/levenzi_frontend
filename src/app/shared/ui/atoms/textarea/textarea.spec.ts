import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvTextareaComponent } from './textarea';

describe('LvTextareaComponent', () => {
  let component: LvTextareaComponent;
  let fixture: ComponentFixture<LvTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvTextareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvTextareaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

