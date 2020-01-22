import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../../core/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  isUserToActivate = false;

  userlogin = new FormControl('', [Validators.required]);
  passwd = new FormControl('', [Validators.required]);
  userid = new FormControl('', [Validators.required]);
  activationcode = new FormControl('', [Validators.required]);
  hide: boolean;

  groupControl = new FormGroup({
    userlogin: this.userlogin,
    passwd: this.passwd,
  });

  activationGroupControl = new FormGroup({
    userid: this.userid,
    activationcode: this.activationcode,
  });

  user_id: number;

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue) {
      this.dialogRef.close();
      this.router.navigate(['/']);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.hide = true;
    this.returnUrl = this.router.url || '/';
  }

  getErrorMessage() {
    return this.userlogin.hasError('required') ? 'Champ recquis' : '';
  }
  checkValidationBeforeSubmit() {
    Object.keys(this.groupControl.controls).forEach(field => {
      const control = this.groupControl.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  login() {
    this.submitted = true;
    this.checkValidationBeforeSubmit();
    if (this.groupControl.invalid) {
      this.submitted = false;
      return;
    }

    this.error = '';
    this.loading = true;
    this.authenticationService.login(this.userlogin.value, this.passwd.value)
      .pipe(first())
      .subscribe(
        data => {
          this.user_id = data.id;
          this.authenticationService.isUserFirstConnection(this.user_id)
          .pipe(first())
          .subscribe(
            data => {
              if (data.isActivation) {
                this.isUserToActivate = true;
                this.authenticationService.logout();
                this.loading = false;
                this.userid.setValue = this.user_id.toString;
              } else {
                this.isUserToActivate = false;
                this.dialogRef.close();
                if(this.returnUrl!="/register")
                  this.router.navigate([this.returnUrl]);
                else
                  this.router.navigate(['/']);
              }
            },
            error => {
              console.log("error" + error);
            }
          );
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  activate() {
    this.authenticationService.validateUser(1, "jeveuxpasserla");
  }
}
