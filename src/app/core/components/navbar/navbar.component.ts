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
import { CartService } from '../../service/cart.service';
import { MatInput } from '@angular/material';

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
  filterBarOpened : boolean = false;
  SmallSettingsNoButtons: boolean = false;
  showSearchBar: boolean;
  textValue: any;

  constructor(public dialog : MatDialog, private userService : UserService, private router : Router,
    private authenticationService : AuthenticationService, private lightmodeService : LightmodeService,
    private opensidenavService : OpensidenavService, private openfilterbarService : OpenfilterbarService, 
    private numberOfItemsService : NumberOfItemsInCartService, private cartService : CartService) {
      this.currentUser = this.authenticationService.currentUserValue;
  }

  ChangeWebMode() {
    this.lightModeEvent = !this.lightModeEvent;
    this.lightmodeService.ChangeLightModeEventMessage(this.lightModeEvent);
  }

  initiateSearch() {
    console.log("searching"+this.textValue);
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
    if (window.innerWidth < 500) this.SmallSettingsNoButtons = true;
  }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if(this.router.url === '/movies'){
        this.showSearchBar = true;
        if(this.filterBarOpened){
          this.openFilterBar()
        }
      }
      else{
        this.showSearchBar = false;
      }
    });
    if (window.innerWidth < 500) this.SmallSettingsNoButtons = true;
    if (this.currentUser != null) {
      this.userService.getById(this.currentUser.userId).pipe(first()).subscribe(user => {
        this.userFromApi = user;
      });
      this.cartService.getUserCart(this.currentUser.userId)
      .pipe()
      .subscribe(
        data => {
          let numberOfItems = 0;
          for (let item of data) {
            numberOfItems += item.movieUserCartCount;
          }
          this.numberOfItemsService.ChangeNumberOfItemsInCartMessage(numberOfItems);
        },
        error => {
          console.log(error);
        }
      );
    }
    this.authenticationService.currentUser.subscribe(dataTransmited => {
      this.currentUser =dataTransmited
    });
  }
  
  openLoginDialog() {
    let dialogRef;
    if (this.lightModeEvent)
      dialogRef = this.dialog.open(LoginComponent, {
        width: '380px'
      });
    else
      dialogRef = this.dialog.open(LoginComponent, {
        width: '380px',
        panelClass: 'dark'
      });

    dialogRef.afterClosed().subscribe(result => {
      this.currentUser = this.authenticationService.currentUserValue;
    });
  }

  disconnect() {
    this.authenticationService.logout();
    this.numberOfItemsService.ChangeNumberOfItemsInCartMessage(0);
    this.currentUser = null;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    this.opensidenavService.ChangeOpenSidenavEventMessage(this.showMenu);
  }
}