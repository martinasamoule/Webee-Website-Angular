import { TestBed } from '@angular/core/testing';

import { UserCanAccessGuard } from './user-can-access.guard';

describe('UserCanAccessGuard', () => {
  let guard: UserCanAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserCanAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
