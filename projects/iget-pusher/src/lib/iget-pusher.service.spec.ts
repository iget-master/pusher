import { TestBed } from '@angular/core/testing';

import { IgetPusherService } from './iget-pusher.service';

describe('IgetPusherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IgetPusherService = TestBed.get(IgetPusherService);
    expect(service).toBeTruthy();
  });
});
