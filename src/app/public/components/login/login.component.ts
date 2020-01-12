import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators, FormGroup} from '@angular/forms';
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

  userlogin = new FormControl('', [Validators.required]);
  passwd = new FormControl('', [Validators.required]);
  hide: boolean;
  
  groupControl = new FormGroup({
    userlogin : this.userlogin,
    passwd : this.passwd,
  });

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) 
  {
    if (this.authenticationService.currentUserValue) {
      this.dialogRef.close();
      this.router.navigate(['/']);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
     // get return url from route parameters or default to '/'
     this.hide = true;
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
     console.log(this.returnUrl);
  }

  getErrorMessage() {
    return this.userlogin.hasError('required') ? 'Champ recquis' : '';
  }
  checkValidationBeforeSubmit(){
    Object.keys(this.groupControl.controls).forEach(field => { 
      const control = this.groupControl.get(field);           
      control.markAsTouched({ onlySelf: true });      
    });
  }

  login(){
    this.submitted = true;
    this.checkValidationBeforeSubmit();
    if (this.groupControl.invalid){
       this.submitted = false;
        return;
    }

    this.error = '';
    this.loading = true;
    this.authenticationService.login(this.userlogin.value, this.passwd.value)
        .pipe(first())
        .subscribe(
            data => {
                this.dialogRef.close();
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
  }
}
