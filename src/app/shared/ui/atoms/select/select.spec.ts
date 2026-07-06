import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvSelectComponent } from './select';


describe('LvSelectComponent', () => {
  let component: LvSelectComponent;
  let fixture: ComponentFixture<LvSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvSelectComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

