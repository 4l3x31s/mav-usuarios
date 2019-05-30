import { TestBed } from '@angular/core/testing';

import { ConductoraService } from './conductora.service';

describe('ConductoraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConductoraService = TestBed.get(ConductoraService);
    expect(service).toBeTruthy();
  });
});
