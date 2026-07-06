import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvNotificationItemComponent } from './notification-item';

describe('NotificationItem', () => {
  let component: LvNotificationItemComponent;
  let fixture: ComponentFixture<LvNotificationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvNotificationItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvNotificationItemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
