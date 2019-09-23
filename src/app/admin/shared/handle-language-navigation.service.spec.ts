import { TestBed, inject } from '@angular/core/testing';

import { HandleLanguageNavigationService } from './handle-language-navigation.service';

describe('HandleLanguageNavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HandleLanguageNavigationService]
    });
  });

  it('should be created', inject([HandleLanguageNavigationService], (service: HandleLanguageNavigationService) => {
    expect(service).toBeTruthy();
  }));
});
