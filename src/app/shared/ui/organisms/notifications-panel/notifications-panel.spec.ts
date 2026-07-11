import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvNotificationsPanelComponent } from './notifications-panel';

describe('LvNotificationsPanelComponent', () => {
  let component: LvNotificationsPanelComponent;
  let fixture: ComponentFixture<LvNotificationsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvNotificationsPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvNotificationsPanelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
