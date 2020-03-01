import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from 'src/app/shared/models/user';
import { NavbarComponent } from '../navbar/navbar.component';
import { LightmodeService } from '../../service/lightmode.service';
import { OpensidenavService } from '../../service/opensidenav.service';
import { Role } from 'src/app/shared/models/role';


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
  lightMode : boolean;
  isAdmin : boolean = false;
  
  @ViewChild('snav', {static: false}) public sidenav: MatSidenav;
  
  _mobileQueryListener: () => void;
  currentUser:User = this.authenticationService.currentUserValue;

  toggleSideNav(evnt){
    this.show = evnt;
    this.sidenav.toggle();
  }

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private lightmodeService: LightmodeService,
            private opensidenavService: OpensidenavService,private authenticationService: AuthenticationService,
            private navbar:NavbarComponent ) {
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

    this.subscriptionlightMode =  this.lightmodeService.getLightModeEventMessage().subscribe(value =>
      this.lightMode = value
    );
   
    this.authenticationService.currentUser.subscribe(dataTransmited =>
        this.currentUser = dataTransmited
    );
    if (this.currentUser != null && this.currentUser.roles.includes(Role.Admin)){
      this.isAdmin = true;
    }
  }
  
  openLoginDialog() {
    this.navbar.openLoginDialog();
  }

  disconnect() {
    this.authenticationService.logout();
  }

}