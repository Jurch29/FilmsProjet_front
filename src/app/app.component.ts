
import {Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjetsFilm';

  private OpenSidenavEvent = new Subject<boolean>();
  private LightModeEvent = new Subject<boolean>();

  constructor() { 
  }

  ChangeOpenSidenavEventMessage(message: boolean) {
    this.OpenSidenavEvent.next(message);
  }
  getOpenSidenavEventMessage(): Observable<boolean>{
    return this.OpenSidenavEvent.asObservable(); 
  }


  ChangeLightModeEventMessage(message: boolean) {
    this.LightModeEvent.next(message);
  }
  getLightModeEventMessage(): Observable<boolean>{
    return this.LightModeEvent.asObservable(); 
  }
}
