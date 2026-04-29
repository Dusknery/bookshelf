import { TestBed } from '@angular/core/testing';

import { Citations } from './citations';

describe('Citations', () => {
  let service: Citations;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Citations);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
