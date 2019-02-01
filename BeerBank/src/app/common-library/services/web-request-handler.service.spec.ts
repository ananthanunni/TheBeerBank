import { TestBed, inject } from '@angular/core/testing';

import { WebRequestHandlerService } from './web-request-handler.service';

describe('WebRequestHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebRequestHandlerService]
    });
  });

  it('should be created', inject([WebRequestHandlerService], (service: WebRequestHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
