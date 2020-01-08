import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../../public/components/login/login.component';
import { first } from 'rxjs/operators';

import { User } from '../../../shared/models/user';
import { AuthenticationService } from '../../service/authentication.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() menuState = new EventEmitter();
  
  userFromApi: User;
  currentUser: User;
  showMenu = false;

  constructor(public dialog: MatDialog, private userService: UserService,
    private authenticationService: AuthenticationService) 
  {
    this.currentUser = this.authenticationService.currentUserValue;
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

  disconnect(){
    this.authenticationService.logout();
    this.currentUser = null;
  }

  toggleMenu() {
    console.log("inside toggleMenu");
    this.showMenu = !this.showMenu;
    this.menuState.emit(this.showMenu);
 }
}