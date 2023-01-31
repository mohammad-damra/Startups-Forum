import { TestBed } from '@angular/core/testing';

import { StartupsResolver } from './startups.resolver';

describe('StartupsResolver', () => {
  let resolver: StartupsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StartupsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
