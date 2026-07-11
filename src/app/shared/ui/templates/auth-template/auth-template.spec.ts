import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvAuthTemplateComponent } from './auth-template';

describe('LvAuthTemplateComponent', () => {
  let component: LvAuthTemplateComponent;
  let fixture: ComponentFixture<LvAuthTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvAuthTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LvAuthTemplateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
