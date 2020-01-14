import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpensidenavService {

  private OpenSidenavEvent = new Subject<boolean>();
  
  constructor() { }

  ChangeOpenSidenavEventMessage(Sidenavstate: boolean) {
    this.OpenSidenavEvent.next(Sidenavstate);
  }
  getOpenSidenavEventMessage(): Observable<boolean>{
    return this.OpenSidenavEvent.asObservable(); 
  }

}
