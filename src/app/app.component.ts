
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
  private NumberOfItemsInCart = new Subject<Number>();

  constructor() { 
  }

  ChangeOpenSidenavEventMessage(Sidenavstate: boolean) {
    this.OpenSidenavEvent.next(Sidenavstate);
  }
  getOpenSidenavEventMessage(): Observable<boolean>{
    return this.OpenSidenavEvent.asObservable(); 
  }

  ChangeNumberOfItemsInCartMessage(NumberOfItems: Number){
    this.NumberOfItemsInCart.next(NumberOfItems);
  }
  getNumberOfItemsInCart() :  Observable<Number>{
    return this.NumberOfItemsInCart.asObservable(); 
  }


  ChangeLightModeEventMessage(LightmodeState: boolean) {
    this.LightModeEvent.next(LightmodeState);
  }
  getLightModeEventMessage(): Observable<boolean>{
    return this.LightModeEvent.asObservable(); 
  }
}
