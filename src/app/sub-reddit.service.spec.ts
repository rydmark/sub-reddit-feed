import { TestBed } from '@angular/core/testing';

import { SubRedditService } from './sub-reddit.service';

describe('SubRedditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubRedditService = TestBed.get(SubRedditService);
    expect(service).toBeTruthy();
  });
});
