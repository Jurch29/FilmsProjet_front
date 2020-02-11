import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LightmodeService {

  private LightModeEvent = new BehaviorSubject<boolean>(false);
  constructor() { }

  ChangeLightModeEventMessage(LightmodeState: boolean) {
    this.LightModeEvent.next(LightmodeState);
  }

  getLightModeEventMessage(): Observable<boolean>{
    return this.LightModeEvent.asObservable(); 
  }
}
