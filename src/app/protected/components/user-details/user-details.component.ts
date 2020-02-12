import { Component, OnInit, OnDestroy } from '@angular/core';
import { LightmodeService } from 'src/app/core/service/lightmode.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit,OnDestroy {


  subscriptionlightMode: any;
  lightMode : boolean;
  loading = false;
  submitted = false;
  lastname = new FormControl('', Validators.required);
  firstname = new FormControl('', Validators.required);
  username = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
 

  groupControl = new FormGroup({
    lastname : this.lastname,
    firstname : this.firstname,
    username : this.username,
    email :this.email
  });

  
  constructor(public dialog : MatDialog,private authenticationService : AuthenticationService,private lightmodeService : LightmodeService) { }

  ngOnInit() {
    
    this.lastname.setValue(this.authenticationService.currentUserValue.userLastname);
    this.firstname.setValue(this.authenticationService.currentUserValue.userFirstname);
    this.username.setValue(this.authenticationService.currentUserValue.userLogin);
    this.email.setValue(this.authenticationService.currentUserValue.userEmail);
  
    this.subscriptionlightMode =  this.lightmodeService.getLightModeEventMessage().subscribe(value =>
      this.lightMode = value
    );
  }
  ngOnDestroy(){
    this.subscriptionlightMode.unsubscribe();
  }
  changePassword(){
      let dialogRef;
      if (this.lightMode)
        dialogRef = this.dialog.open(ChangePasswordComponent, {
          width: '350px'
        });
      else
        dialogRef = this.dialog.open(ChangePasswordComponent, {
          width: '350px',
          panelClass: 'dark'
        });
      }

      checkValidationBeforeSubmit(){
        Object.keys(this.groupControl.controls).forEach(field => { 
          const control = this.groupControl.get(field);           
          control.markAsTouched({ onlySelf: true });      
        });
      }
  changeUserDetails(){
    this.submitted = true;
    this.checkValidationBeforeSubmit();
    if (this.groupControl.invalid){
      this.submitted = false;
      return;
    }
    this.authenticationService.currentUserValue.userLastname = this.lastname.value;
    this.authenticationService.currentUserValue.userFirstname = this.firstname.value;
    this.authenticationService.currentUserValue.userLogin = this.username.value;
    this.authenticationService.currentUserValue.userEmail = this.email.value;
  }
}
