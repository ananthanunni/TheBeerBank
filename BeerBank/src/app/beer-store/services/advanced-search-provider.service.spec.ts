import { TestBed } from '@angular/core/testing';

import { AdvancedSearchProviderService } from './advanced-search-provider.service';

describe('AdvancedSearchProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdvancedSearchProviderService = TestBed.get(AdvancedSearchProviderService);
    expect(service).toBeTruthy();
  });
});
