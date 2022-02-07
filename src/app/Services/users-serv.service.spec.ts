import { TestBed } from '@angular/core/testing';

import { UsersServService } from './users-serv.service';

describe('UsersServService', () => {
  let service: UsersServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
