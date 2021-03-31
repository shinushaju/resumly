import { TestBed } from '@angular/core/testing';

import { WebapiRequestService } from './webapi-request.service';

describe('WebapiRequestService', () => {
  let service: WebapiRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebapiRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
