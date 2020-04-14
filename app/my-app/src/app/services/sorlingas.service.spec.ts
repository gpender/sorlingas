import { TestBed } from '@angular/core/testing';

import { SorlingasService } from './sorlingas.service';

describe('SorlingasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SorlingasService = TestBed.get(SorlingasService);
    expect(service).toBeTruthy();
  });
});
