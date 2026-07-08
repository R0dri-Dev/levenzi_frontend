import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvTagComponent } from './tag';

describe('LvTagComponent', () => {
  let component: LvTagComponent;
  let fixture: ComponentFixture<LvTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvTagComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvTagComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
