import { TestBed, inject } from '@angular/core/testing';

import { FeaturedService } from './featured.service';

describe('FeaturedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeaturedService]
    });
  });

  it('should be created', inject([FeaturedService], (service: FeaturedService) => {
    expect(service).toBeTruthy();
  }));
});
