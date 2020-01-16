import { TestBed } from '@angular/core/testing';

import { OpenfilterbarService } from './openfilterbar.service';

describe('OpenfilterbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenfilterbarService = TestBed.get(OpenfilterbarService);
    expect(service).toBeTruthy();
  });
});
