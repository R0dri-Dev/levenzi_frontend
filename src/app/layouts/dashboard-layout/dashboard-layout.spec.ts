import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLayout, normalizeSidebarMenuItems } from './dashboard-layout';

describe('DashboardLayout', () => {
  let component: DashboardLayout;
  let fixture: ComponentFixture<DashboardLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('normalizes menu items from a permissive payload', () => {
    const items = normalizeSidebarMenuItems([
      { name: 'instalaciones', icon: 'settings' },
      { route: '/productos', icon: 'box' },
      { path: 'roles', title: 'Roles' },
    ], '/dashboard');

    expect(items).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({ label: 'Instalaciones', route: '/instalaciones', icon: 'settings' }),
        jasmine.objectContaining({ label: 'Productos', route: '/productos', icon: 'box' }),
        jasmine.objectContaining({ label: 'Roles', route: '/roles', icon: 'settings' }),
      ])
    );
  });
});
