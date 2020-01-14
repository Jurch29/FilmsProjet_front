import { TestBed } from '@angular/core/testing';

import { NumberOfItemsInCartService } from './number-of-items-in-cart.service';

describe('NumberOfItemsInCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NumberOfItemsInCartService = TestBed.get(NumberOfItemsInCartService);
    expect(service).toBeTruthy();
  });
});
