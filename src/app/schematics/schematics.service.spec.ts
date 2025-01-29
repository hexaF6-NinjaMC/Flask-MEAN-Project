import { TestBed } from '@angular/core/testing';

import { SchematicsService } from './schematics.service';

describe('SchematicsService', () => {
  let service: SchematicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchematicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
