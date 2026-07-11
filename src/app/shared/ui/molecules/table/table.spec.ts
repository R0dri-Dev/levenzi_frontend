import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAction } from '../../../interfaces/table.interface';
import { LvTableComponent } from './table';

describe('LvTableComponent', () => {
  let component: LvTableComponent;
  let fixture: ComponentFixture<LvTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute the action handler when an action is clicked', () => {
    const actionSpy = jasmine.createSpy('action');
    const action: TableAction<{ id: number }> = {
      label: 'Editar',
      action: actionSpy,
    };
    const item = { id: 1 };

    component.handleActionClick(action, item, new MouseEvent('click'));

    expect(actionSpy).toHaveBeenCalledWith(item);
  });
});
