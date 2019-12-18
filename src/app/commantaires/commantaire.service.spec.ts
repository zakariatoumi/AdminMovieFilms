import { TestBed } from '@angular/core/testing';

import { CommantaireService } from './commantaire.service';

describe('CommantaireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommantaireService = TestBed.get(CommantaireService);
    expect(service).toBeTruthy();
  });
});
