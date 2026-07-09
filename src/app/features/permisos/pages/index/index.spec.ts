import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PermisoService } from '../../../../core/services/permiso/permiso.service';
import { Index } from './index';

describe('Index', () => {
  let component: Index;
  let fixture: ComponentFixture<Index>;

  beforeEach(async () => {
    const permisoServiceMock = {
      list: jasmine.createSpy('list').and.returnValue(of({ data: [], total: 0 })),
      create: jasmine.createSpy('create').and.returnValue(of({ id: 99, name: 'Nuevo', guard_name: 'web', created_at: null, updated_at: null })),
      update: jasmine.createSpy('update').and.returnValue(of({ id: 1, name: 'Actualizado', guard_name: 'api', created_at: null, updated_at: null })),
      delete: jasmine.createSpy('delete').and.returnValue(of({ success: true })),
    };

    await TestBed.configureTestingModule({
      imports: [Index],
      providers: [{ provide: PermisoService, useValue: permisoServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(Index);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the create form and add a permission', () => {
    component.openCreateForm();
    expect(component.activeView()).toBe('create');

    component.handleCreateSubmit({ name: 'Nuevo permiso', guard_name: 'web' });

    expect(component.permisos().some((permiso) => permiso.name === 'Nuevo permiso')).toBeTrue();
  });
});
