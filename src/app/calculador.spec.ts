import { TestBed } from '@angular/core/testing';

import { Calculador } from './calculador';

describe('Calculador', () => {
  let service: Calculador;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Calculador);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
