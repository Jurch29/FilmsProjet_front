
import {MediaMatcher} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import {ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjetsFilm';
  @ViewChild('snav', {static: false}) public sidenav: MatSidenav;
  
  subMenuState:boolean = false;
  toggleSideNav(evnt){
    this.subMenuState = evnt;
    this.sidenav.toggle();
    console.log("inside toggleSideNav: pls. change showMenu to be:",this.subMenuState);
  }

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 10}, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
