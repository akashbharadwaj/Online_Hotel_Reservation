import { TestBed, inject } from '@angular/core/testing';

import { AdminfunctionsService } from './adminfunctions.service';

describe('AdminfunctionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminfunctionsService]
    });
  });

  it('should be created', inject([AdminfunctionsService], (service: AdminfunctionsService) => {
    expect(service).toBeTruthy();
  }));
});
