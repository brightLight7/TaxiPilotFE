import { TestBed } from '@angular/core/testing';

import { TaxipilotService } from './taxipilot.service';

describe('TaxipilotService', () => {
  let service: TaxipilotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxipilotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
