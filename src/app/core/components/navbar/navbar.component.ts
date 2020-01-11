import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../../public/components/login/login.component';
import { first } from 'rxjs/operators';


import { User } from '../../../shared/models/user';
import { AuthenticationService } from '../../service/authentication.service';
import { UserService } from '../../service/user.service';
import { RegisterComponent } from 'src/app/public/components/register/register.component';
import { FormControl, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { removeSummaryDuplicates } from '@angular/compiler';

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
  constructor(public dialog: MatDialog, private userService: UserService,
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

  shop() {
    console.log("buy");
  }
  ngOnInit() {
    if (this.currentUser!=null){
      this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
        this.userFromApi = user;
      });
    }
  }
  
  openConnexionDialog() {
    let dialogRef;
    console.log(this.lightModeEvent)
    if(this.lightModeEvent)
      dialogRef = this.dialog.open(LoginComponent, {
        width: '250px'
      });
    else
      dialogRef = this.dialog.open(LoginComponent, {
        width: '250px',
        panelClass:'dark'
      });

    dialogRef.afterClosed().subscribe(result => {
      this.currentUser = this.authenticationService.currentUserValue;
    });
  }
  openInscriptionDialog() {
    let dialogRef;
    console.log(this.lightModeEvent)
    if(this.lightModeEvent){
      dialogRef =this.dialog.open(RegisterComponent, {
        width: '250px'
      });
    }else{
      console.log("ici")
      dialogRef = this.dialog.open(RegisterComponent, {
        width: '250px',
        panelClass:'dark'
      });
    }
    dialogRef.afterClosed().subscribe(result => {
      
    });
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