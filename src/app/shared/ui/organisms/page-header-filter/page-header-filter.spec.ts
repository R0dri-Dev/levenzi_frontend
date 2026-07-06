import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvPageHeaderFilterComponent } from './page-header-filter';

describe('LvPageHeaderFilterComponent', () => {
  let component: LvPageHeaderFilterComponent;
  let fixture: ComponentFixture<LvPageHeaderFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvPageHeaderFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvPageHeaderFilterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header title', () => {
    fixture.componentRef.setInput('title', 'Inventario');
    fixture.componentRef.setInput('subtitle', 'Filtra y revisa registros');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Inventario');
    expect(fixture.nativeElement.textContent).toContain('Filtra y revisa registros');
  });
});
