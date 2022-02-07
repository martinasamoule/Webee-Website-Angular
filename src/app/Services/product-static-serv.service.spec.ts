import { TestBed } from '@angular/core/testing';

import { ProductStaticServService } from './product-static-serv.service';

describe('ProductStaticServService', () => {
  let service: ProductStaticServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductStaticServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
