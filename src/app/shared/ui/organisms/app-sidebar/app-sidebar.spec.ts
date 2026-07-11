import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { LvAppSidebarComponent } from './app-sidebar';

describe('LvAppSidebarComponent', () => {
  let component: LvAppSidebarComponent;
  let fixture: ComponentFixture<LvAppSidebarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, LvAppSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvAppSidebarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    // component.items.set([{ label: 'Roles', route: '/roles' }, { label: 'Dashboard', route: '/dashboard' }]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('marks the current route as active', async () => {
    await router.navigateByUrl('/roles');
    fixture.detectChanges();
  });
});
