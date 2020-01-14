import { TestBed } from '@angular/core/testing';

import { OpensidenavService } from './opensidenav.service';

describe('OpensidenavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpensidenavService = TestBed.get(OpensidenavService);
    expect(service).toBeTruthy();
  });
});
