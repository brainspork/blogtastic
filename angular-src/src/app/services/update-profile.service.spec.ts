import { TestBed, inject } from '@angular/core/testing';

import { UpdateProfileService } from './update-profile.service';

describe('UpdateProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateProfileService]
    });
  });

  it('should be created', inject([UpdateProfileService], (service: UpdateProfileService) => {
    expect(service).toBeTruthy();
  }));
});
