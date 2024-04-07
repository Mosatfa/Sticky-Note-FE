import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarTogglerService {
  toggle:any = new BehaviorSubject(false)
  constructor() { }
}
