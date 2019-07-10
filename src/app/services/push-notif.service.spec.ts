import { TestBed } from '@angular/core/testing';

import { PushNotifService } from './push-notif.service';

describe('PushNotifService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PushNotifService = TestBed.get(PushNotifService);
    expect(service).toBeTruthy();
  });
});
