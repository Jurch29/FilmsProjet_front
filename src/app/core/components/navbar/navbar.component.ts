import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../../public/components/login/login.component';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';


import { User } from '../../../shared/models/user';
import { AuthenticationService } from '../../service/authentication.service';
import { UserService } from '../../service/user.service';
import { AppComponent } from 'src/app/app.component';

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
  numberOfItems: Number;

  constructor(public dialog: MatDialog, private userService: UserService, private router: Router,
    private authenticationService: AuthenticationService,private appComponent: AppComponent) 
  {
    this.currentUser = this.authenticationService.currentUserValue;
  }
  
  ChangeWebMode(){
    this.lightModeEvent = !this.lightModeEvent;
    this.appComponent.ChangeLightModeEventMessage(this.lightModeEvent);
  }
  initiateSearch(){
    console.log("searching");
  }

  goToCart() {
    console.log("buy");
  }
  ngOnInit() {
    this.appComponent.getNumberOfItemsInCart().subscribe(number => this.numberOfItems =number);
    if (this.currentUser!=null){
      this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
        this.userFromApi = user;
      });
    }
  }
  
  openLoginDialog() {
    let dialogRef;
    if(this.lightModeEvent)
      dialogRef = this.dialog.open(LoginComponent, {
        width: '350px'
      });
    else
      dialogRef = this.dialog.open(LoginComponent, {
        width: '350px',
        panelClass:'dark'
      });

    dialogRef.afterClosed().subscribe(result => {
      this.currentUser = this.authenticationService.currentUserValue;
    });
  }
  openRegisterWebPage() {
    this.router.navigate(['register']);
  }

  openHome() {
    this.router.navigate(['home']);
  }
  disconnect(){
    this.authenticationService.logout();
    this.currentUser = null;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    this.appComponent.ChangeOpenSidenavEventMessage(this.showMenu);
 }
}