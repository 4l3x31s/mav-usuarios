import { TestBed } from '@angular/core/testing';

import { ContratoService } from './contrato.service';

describe('ContratoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContratoService = TestBed.get(ContratoService);
    expect(service).toBeTruthy();
  });
});
