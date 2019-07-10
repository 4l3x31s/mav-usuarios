import { TestBed } from '@angular/core/testing';

import { TokenNotifService } from './token-notif.service';

describe('TokenNotifService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenNotifService = TestBed.get(TokenNotifService);
    expect(service).toBeTruthy();
  });
});
