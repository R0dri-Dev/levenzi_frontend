import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderFilter } from './page-header-filter';

describe('PageHeaderFilter', () => {
  let component: PageHeaderFilter;
  let fixture: ComponentFixture<PageHeaderFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHeaderFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(PageHeaderFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
