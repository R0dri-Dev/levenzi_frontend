import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvTopbarComponent } from './Topbar';

describe('LvTopbarComponent', () => {
  let component: LvTopbarComponent;
  let fixture: ComponentFixture<LvTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvTopbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvTopbarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
