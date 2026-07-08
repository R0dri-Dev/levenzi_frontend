import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvParagraphComponent } from './paragraph';

describe('LvParagraphComponent', () => {
  let component: LvParagraphComponent;
  let fixture: ComponentFixture<LvParagraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvParagraphComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvParagraphComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
