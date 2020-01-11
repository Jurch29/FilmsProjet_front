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

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  userFromApi: User;
  currentUser: User;
  showMenu = false;
  constructor(public dialog: MatDialog, private userService: UserService,
    private authenticationService: AuthenticationService,private data: AppComponent) 
  {
    this.currentUser = this.authenticationService.currentUserValue;
    
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
  
  openConnexionDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.currentUser = this.authenticationService.currentUserValue;
      console.log('The dialog was closed');
    });
  }
  openInscriptionDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  disconnect(){
    this.authenticationService.logout();
    this.currentUser = null;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    console.log("inside toggleMenu : "+this.showMenu);
    this.data.changeMessage(this.showMenu+"");
 }
}