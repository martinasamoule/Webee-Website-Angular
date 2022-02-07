import { TestBed } from '@angular/core/testing';

import { UserAuthServService } from './user-auth-serv.service';

describe('UserAuthServService', () => {
  let service: UserAuthServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
