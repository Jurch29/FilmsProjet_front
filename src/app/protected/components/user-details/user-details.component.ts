import { Component, OnInit, OnDestroy } from '@angular/core';
import { LightmodeService } from 'src/app/core/service/lightmode.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatDialog } from '@angular/material';
import { UserService } from 'src/app/core/service/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {


  subscriptionlightMode: any;
  lightMode: boolean;
  loading = false;
  submitted = false;
  lastname = new FormControl('', Validators.required);
  firstname = new FormControl('', Validators.required);
  username = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);


  groupControl = new FormGroup({
    lastname: this.lastname,
    firstname: this.firstname,
    username: this.username,
    email: this.email
  });
  error: any;


  constructor(public dialog: MatDialog, private userservice: UserService, private authenticationService: AuthenticationService, private lightmodeService: LightmodeService) { }

  ngOnInit() {
    this.lastname.setValue(this.authenticationService.currentUserValue.userLastname);
    this.firstname.setValue(this.authenticationService.currentUserValue.userFirstname);
    this.username.setValue(this.authenticationService.currentUserValue.userLogin);
    this.email.setValue(this.authenticationService.currentUserValue.userEmail);

    this.subscriptionlightMode = this.lightmodeService.getLightModeEventMessage().subscribe(value =>
      this.lightMode = value
    );
  }
  ngOnDestroy() {
    this.subscriptionlightMode.unsubscribe();
  }
  changePassword() {
    let dialogRef;
    if (this.lightMode)
      dialogRef = this.dialog.open(ChangePasswordComponent, {
        width: '380px'
      });
    else
      dialogRef = this.dialog.open(ChangePasswordComponent, {
        width: '380px',
        panelClass: 'dark'
      });
  }

  checkValidationBeforeSubmit() {
    Object.keys(this.groupControl.controls).forEach(field => {
      const control = this.groupControl.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
  changeUserDetails() {
    this.submitted = true;
    this.checkValidationBeforeSubmit();
    if (this.groupControl.invalid) {
      this.submitted = false;
      return;
    }
    this.userservice.changeUserDetails(this.authenticationService.currentUserValue.userId, this.lastname.value, this.firstname.value, this.username.value, this.email.value)
      .pipe(first())
      .subscribe(
        data => {
          this.authenticationService.updateUser(data)
        },
        error => {
          console.log(error);
        });
  }
}
