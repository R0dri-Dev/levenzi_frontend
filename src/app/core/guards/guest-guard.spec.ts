import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { CanActivateFn } from '@angular/router';
import { provideRouter } from '@angular/router';

import { guestGuard } from './guest-guard';

describe('guestGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => guestGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
