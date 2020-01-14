import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, NgModule } from '@angular/core';
import { MatSidenav, MatDialog } from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationService } from '../../service/authentication.service';
import { UserService } from '../../service/user.service';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NavbarComponent } from '../navbar/navbar.component';
import { LightmodeService } from '../../service/lightmode.service';
import { OpensidenavService } from '../../service/opensidenav.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
  
})
export class SidenavComponent implements OnInit, OnDestroy {

  subscriptionOpenSideNav: any;
  mobileQuery: MediaQueryList;
  show: string;
  subscriptionlightMode: any;

  @ViewChild('snav', {static: false}) public sidenav: MatSidenav;
  
  lightMode : boolean;

  _mobileQueryListener: () => void;
  currentUser:User = this.authenticationService.currentUserValue;

  toggleSideNav(evnt){
    this.show = evnt;
    this.sidenav.toggle();
  }

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private lightmodeService: LightmodeService,private opensidenavService: OpensidenavService,private authenticationService: AuthenticationService,private navbar:NavbarComponent ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener); 
    
  }
  

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscriptionOpenSideNav.unsubscribe();
    this.subscriptionlightMode.unsubscribe();
  }

  
  ngOnInit() {
    this.subscriptionOpenSideNav = this.opensidenavService.getOpenSidenavEventMessage().subscribe(dataTransmited =>{
      this.toggleSideNav(dataTransmited);
    });
    this.subscriptionlightMode = this.lightmodeService.getLightModeEventMessage().subscribe(dataTransmited =>{
      this.lightMode = dataTransmited;
    });
    this.authenticationService.currentUser.subscribe(dataTransmited =>
      this.currentUser =dataTransmited
      );
  }
  
  openLoginDialog() {
    this.navbar.openLoginDialog();
  }

  disconnect() {
    this.authenticationService.logout();
  }

}
