import { TestBed } from '@angular/core/testing';

import { NavParamService } from './nav-param.service';

describe('NavParamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavParamService = TestBed.get(NavParamService);
    expect(service).toBeTruthy();
  });
});
