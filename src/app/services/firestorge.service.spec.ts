import { TestBed } from '@angular/core/testing';

import { FirestorgeService } from './firestorge.service';

describe('FirestorgeService', () => {
  let service: FirestorgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestorgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
