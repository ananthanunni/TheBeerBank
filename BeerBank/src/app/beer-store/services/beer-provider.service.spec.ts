import { TestBed } from '@angular/core/testing';

import { BeerProviderService } from './beer-provider.service';

describe('BeerProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeerProviderService = TestBed.get(BeerProviderService);
    expect(service).toBeTruthy();
  });
});
