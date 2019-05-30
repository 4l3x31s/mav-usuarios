import { TestBed } from '@angular/core/testing';

import { VehiculoService } from './vehiculo.service';

describe('VehiculoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehiculoService = TestBed.get(VehiculoService);
    expect(service).toBeTruthy();
  });
});
