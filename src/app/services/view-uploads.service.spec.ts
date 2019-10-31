import { TestBed } from '@angular/core/testing';

import { ViewUploadsService } from './view-uploads.service';

describe('ViewUploadsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewUploadsService = TestBed.get(ViewUploadsService);
    expect(service).toBeTruthy();
  });
});
