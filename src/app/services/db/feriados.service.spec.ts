import { TestBed } from '@angular/core/testing';

import { FeriadosService } from './feriados.service';

describe('FeriadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeriadosService = TestBed.get(FeriadosService);
    expect(service).toBeTruthy();
  });
});
