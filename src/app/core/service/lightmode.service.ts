import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LightmodeService {

  private LightModeEvent = new Subject<boolean>();
  constructor() { }

  ChangeLightModeEventMessage(LightmodeState: boolean) {
    this.LightModeEvent.next(LightmodeState);
  }
  getLightModeEventMessage(): Observable<boolean>{
    return this.LightModeEvent.asObservable(); 
  }
}
