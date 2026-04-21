import { TestBed } from '@angular/core/testing';

import { Booklist } from './booklist';

describe('Booklist', () => {
  let service: Booklist;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Booklist);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
