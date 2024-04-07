import { TestBed } from '@angular/core/testing';

import { NavbarTogglerService } from './navbar-toggler.service';

describe('NavbarTogglerService', () => {
  let service: NavbarTogglerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarTogglerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
