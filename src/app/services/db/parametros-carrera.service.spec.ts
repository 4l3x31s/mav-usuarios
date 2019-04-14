import { TestBed } from '@angular/core/testing';

import { ParametrosCarreraService } from './parametros-carrera.service';

describe('ParametrosCarreraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParametrosCarreraService = TestBed.get(ParametrosCarreraService);
    expect(service).toBeTruthy();
  });
});
