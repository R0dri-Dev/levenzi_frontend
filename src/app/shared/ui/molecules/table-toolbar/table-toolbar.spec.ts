import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvTableToolbarComponent } from './table-toolbar';

describe('LvTableToolbarComponent', () => {
  let component: LvTableToolbarComponent;
  let fixture: ComponentFixture<LvTableToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvTableToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvTableToolbarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
