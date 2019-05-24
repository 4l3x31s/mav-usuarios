import { TestBed } from '@angular/core/testing';

import { MapParamService } from './map-param.service';

describe('MapParamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapParamService = TestBed.get(MapParamService);
    expect(service).toBeTruthy();
  });
});
