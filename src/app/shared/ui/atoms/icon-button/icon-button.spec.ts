import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvIconButtonComponent } from './icon-button';

describe('LvIconButtonComponent', () => {
  let component: LvIconButtonComponent;
  let fixture: ComponentFixture<LvIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvIconButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvIconButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', 'menu');
    fixture.componentRef.setInput('label', 'Abrir menú');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
