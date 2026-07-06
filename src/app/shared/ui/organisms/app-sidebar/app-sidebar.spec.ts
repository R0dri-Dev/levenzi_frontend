import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvAppSidebarComponent } from './app-sidebar';

describe('LvAppSidebarComponent', () => {
  let component: LvAppSidebarComponent;
  let fixture: ComponentFixture<LvAppSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvAppSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvAppSidebarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
