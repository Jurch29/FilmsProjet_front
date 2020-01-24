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
  activationcode = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]);
  hide: boolean;

  groupControl = new FormGroup({
    userlogin: this.userlogin,
    passwd: this.passwd,
  });

  activationGroupControl = new FormGroup({
    activationcode: this.activationcode
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

  getErrorLoginMessage() {
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
          if (data.isActivation) {
            this.isUserToActivate = true;
            this.loading = false;
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
          this.user_id = undefined;
          this.error = error;
          this.loading = false;
        });
  }

  activate() {
    if (this.activationGroupControl.invalid){
      this.submitted = false;
      return;
    }
    this.loading = true;
    this.error = '';
    this.authenticationService.validateUser(this.user_id, this.activationcode.value)
    .pipe().subscribe(
      data => {
        this.loading = false;
        if (data.isActivated) {
          this.login();
        } else {
          this.error = 'Code d\'activation incorrect';
        }
      },
      error => {
        this.loading = false;
        console.log("error" + error);
      }
    );
  }
}
