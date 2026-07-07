import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvAppFooterComponent } from './app-footer';

describe('LvAppFooterComponent', () => {
  let component: LvAppFooterComponent;
  let fixture: ComponentFixture<LvAppFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvAppFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvAppFooterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
