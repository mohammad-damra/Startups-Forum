import { TestBed } from '@angular/core/testing';

import { SectorsResolverResolver } from './sectors-resolver.resolver';

describe('SectorsResolverResolver', () => {
  let resolver: SectorsResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SectorsResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
