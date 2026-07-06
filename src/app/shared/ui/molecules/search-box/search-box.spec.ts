import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvSearchBoxComponent } from './search-box';

describe('LvSearchBoxComponent', () => {
  let component: LvSearchBoxComponent;
  let fixture: ComponentFixture<LvSearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvSearchBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvSearchBoxComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
