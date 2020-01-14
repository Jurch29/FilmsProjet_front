import { TestBed } from '@angular/core/testing';

import { LightmodeService } from './lightmode.service';

describe('LightmodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LightmodeService = TestBed.get(LightmodeService);
    expect(service).toBeTruthy();
  });
});
