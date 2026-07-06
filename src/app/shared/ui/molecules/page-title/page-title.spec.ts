import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvPageTitleComponent } from './page-title';

describe('LvPageTitleComponent', () => {
  let component: LvPageTitleComponent;
  let fixture: ComponentFixture<LvPageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvPageTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvPageTitleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title and subtitle', () => {
    fixture.componentRef.setInput('title', 'Pacientes');
    fixture.componentRef.setInput('subtitle', 'Gestiona el listado principal');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Pacientes');
    expect(fixture.nativeElement.textContent).toContain('Gestiona el listado principal');
  });
});
