import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvPageHeaderComponent } from './page-header';

describe('LvPageHeaderComponent', () => {
  let component: LvPageHeaderComponent;
  let fixture: ComponentFixture<LvPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvPageHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvPageHeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
