import { TestBed } from '@angular/core/testing';

import { GeolocalizacionService } from './geolocalizacion.service';

describe('GeolocalizacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeolocalizacionService = TestBed.get(GeolocalizacionService);
    expect(service).toBeTruthy();
  });
});
