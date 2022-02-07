import { TestBed } from '@angular/core/testing';

import { APIProductServService } from './apiproduct-serv.service';

describe('APIProductServService', () => {
  let service: APIProductServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIProductServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
