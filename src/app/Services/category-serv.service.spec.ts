import { TestBed } from '@angular/core/testing';

import { CategoryServService } from './category-serv.service';

describe('CategoryServService', () => {
  let service: CategoryServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
