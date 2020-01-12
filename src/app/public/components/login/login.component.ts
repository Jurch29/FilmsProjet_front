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

  email = new FormControl('', [Validators.required, Validators.email]);
  passwd = new FormControl('', [Validators.required]);
  hide: boolean;
  
  groupControl = new FormGroup({
    email : this.email,
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
    return this.email.hasError('required') ? 'Champ recquis' :
        this.email.hasError('email') ? 'Email non valide' :
            '';
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
    this.authenticationService.login(this.email.value, this.passwd.value)
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
