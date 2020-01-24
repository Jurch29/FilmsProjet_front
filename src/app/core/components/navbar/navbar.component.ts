import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../../public/components/login/login.component';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';


import { User } from '../../../shared/models/user';
import { AuthenticationService } from '../../service/authentication.service';
import { UserService } from '../../service/user.service';
import { LightmodeService } from '../../service/lightmode.service';
import { OpensidenavService } from '../../service/opensidenav.service';
import { NumberOfItemsInCartService } from '../../service/number-of-items-in-cart.service';
import { OpenfilterbarService } from '../../service/openfilterbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userFromApi: User;
  currentUser: User;
  lightModeEvent: boolean = false;
  showMenu = false;
  numberOfItems: number;
  filterBarOpened : boolean = false;
  SmallSettingsNoButtons: boolean = false;

  constructor(public dialog : MatDialog, private userService : UserService, private router : Router,
    private authenticationService : AuthenticationService, private lightmodeService : LightmodeService,
    private opensidenavService : OpensidenavService, private openfilterbarService : OpenfilterbarService, 
    private numberofitemsincartService : NumberOfItemsInCartService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ChangeWebMode() {
    this.lightModeEvent = !this.lightModeEvent;
    this.lightmodeService.ChangeLightModeEventMessage(this.lightModeEvent);
  }

  initiateSearch() {
    console.log("searching");
  }

  openFilterBar(){
    this.filterBarOpened = !this.filterBarOpened;
    this.openfilterbarService.ChangeOpenFilterBarMessage(this.filterBarOpened);
  }

  goToCart() {
    this.router.navigate(['userCart']);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.innerWidth < 400) this.SmallSettingsNoButtons = true;
  }

  ngOnInit() {
    if (window.innerWidth < 400) this.SmallSettingsNoButtons = true;

    this.numberofitemsincartService.getNumberOfItemsInCart().subscribe(number => { this.numberOfItems = number });
    if (this.currentUser != null) {
      this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
        this.userFromApi = user;
      });
    }
    this.authenticationService.currentUser.subscribe(dataTransmited => {
      this.currentUser =dataTransmited
    }
      );
  }
  
  openLoginDialog() {
    let dialogRef;
    if (this.lightModeEvent)
      dialogRef = this.dialog.open(LoginComponent, {
        width: '350px'
      });
    else
      dialogRef = this.dialog.open(LoginComponent, {
        width: '350px',
        panelClass: 'dark'
      });

    dialogRef.afterClosed().subscribe(result => {
      this.currentUser = this.authenticationService.currentUserValue;
    });
  }

  disconnect() {
    this.authenticationService.logout();
    this.numberofitemsincartService.ChangeNumberOfItemsInCartMessage(0);
    this.currentUser = null;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    this.opensidenavService.ChangeOpenSidenavEventMessage(this.showMenu);
  }
  
  setNumberOfItems(number : number) {
    this.numberofitemsincartService.ChangeNumberOfItemsInCartMessage(number);
  }
}