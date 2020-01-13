
import {Component } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjetsFilm';

  private OpenSidenavEvent = new Subject<boolean>();
  private LightModeEvent = new Subject<boolean>();
  private NumberOfItemsInCart = new BehaviorSubject<number>(0);

  constructor() { 
  }

  ChangeOpenSidenavEventMessage(Sidenavstate: boolean) {
    this.OpenSidenavEvent.next(Sidenavstate);
  }
  getOpenSidenavEventMessage(): Observable<boolean>{
    return this.OpenSidenavEvent.asObservable(); 
  }

  ChangeNumberOfItemsInCartMessage(NumberOfItems: number){
    this.NumberOfItemsInCart.next(NumberOfItems);
  }
  getNumberOfItemsInCart() :  Observable<number>{
    return this.NumberOfItemsInCart.asObservable(); 
  }
  getItemsCount() : number{
    return this.NumberOfItemsInCart.getValue();
  }

  ChangeLightModeEventMessage(LightmodeState: boolean) {
    this.LightModeEvent.next(LightmodeState);
  }
  getLightModeEventMessage(): Observable<boolean>{
    return this.LightModeEvent.asObservable(); 
  }
}
