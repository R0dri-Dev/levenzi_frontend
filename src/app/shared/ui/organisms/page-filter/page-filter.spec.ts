import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFilter } from './page-filter';

describe('PageFilter', () => {
  let component: PageFilter;
  let fixture: ComponentFixture<PageFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(PageFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
