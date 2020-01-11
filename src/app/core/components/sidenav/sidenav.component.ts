import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, NgModule } from '@angular/core';
import { MatSidenav } from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
  
})
export class SidenavComponent implements OnInit, OnDestroy {

  subscription: any;
  mobileQuery: MediaQueryList;


  @ViewChild('snav', {static: false}) public sidenav: MatSidenav;
  

  public fillerNav = Array.from({length: 10}, (_, i) => `Nav Item ${i + 1}`);

  _mobileQueryListener: () => void;
  show: string;

  toggleSideNav(evnt){
    this.show = evnt;
    this.sidenav.toggle();
  }

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private data: AppComponent) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener); 
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscription.unsubscribe();
  }

  
  ngOnInit() {
    this.subscription = this.data.getMessageSource().subscribe(mymessage =>{
      console.log("subscirbe: ",mymessage );
      this.toggleSideNav(mymessage+"");
    });
  }
  
}
