import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvPageTemplateComponent } from './page-template';

describe('LvPageTemplateComponent', () => {
  let component: LvPageTemplateComponent;
  let fixture: ComponentFixture<LvPageTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvPageTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvPageTemplateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
