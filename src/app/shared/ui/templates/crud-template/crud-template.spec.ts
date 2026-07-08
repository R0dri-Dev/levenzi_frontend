import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvCrudTemplateComponent } from './crud-template';

describe('LvCrudTemplateComponent', () => {
  let component: LvCrudTemplateComponent;
  let fixture: ComponentFixture<LvCrudTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvCrudTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvCrudTemplateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
