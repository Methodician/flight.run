import { TestBed, inject } from '@angular/core/testing';

import { LinkAuthService } from './link-auth.service';

describe('LinkAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinkAuthService]
    });
  });

  it('should be created', inject([LinkAuthService], (service: LinkAuthService) => {
    expect(service).toBeTruthy();
  }));
});
