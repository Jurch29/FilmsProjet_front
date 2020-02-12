import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../../core/service/authentication.service';
import { CartService } from 'src/app/core/service/cart.service';
import { NumberOfItemsInCartService } from 'src/app/core/service/number-of-items-in-cart.service';
import { UserActivation } from 'src/app/shared/models/user-activation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  isForgetPassword = false;
  returnUrl: string;
  error = '';
  isUserToActivate = false;
  userActivation : UserActivation = new UserActivation;
  
  userlogin = new FormControl('', [Validators.required]);
  passwd = new FormControl('', [Validators.required]);
  emailForgetPassword = new FormControl('',[Validators.required,Validators.email]);
  activationcode = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]);
  hide: boolean;

  groupControl = new FormGroup({
    userlogin: this.userlogin,
    passwd: this.passwd,
  });
  emailForgetPasswordGroupControl = new FormGroup({
    emailForgetPassword: this.emailForgetPassword
  });

  activationGroupControl = new FormGroup({
    activationcode: this.activationcode
  });

  user_id: number;

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private cartService : CartService,
    private numberOfItemsService : NumberOfItemsInCartService) {
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
  getErrorEmailForgetPassword(){
    if(this.emailForgetPassword.hasError('required'))return 'Champ recquis' ;
    else if(this.emailForgetPassword.hasError('email'))return 'Email invalide';
    return '';
  }
  forgetPassword(){
    this.isForgetPassword = true;
  }
  register(){
    this.dialogRef.close();
      this.router.navigate(['/register']);
  }
  sendEmailForggetPassword(){
    this.checkValidationBeforeSubmit(this.emailForgetPasswordGroupControl);
    if(this.emailForgetPasswordGroupControl.invalid){
      return;
    }
  }
  checkValidationBeforeSubmit(groupControl) {
    Object.keys(groupControl.controls).forEach(field => {
      const control = groupControl.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  login() {
    this.submitted = true;
    this.checkValidationBeforeSubmit(this.groupControl);
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
          this.user_id = data.userId;
          if (data.toActivate) {
            this.isUserToActivate = true;
            this.loading = false;
          } else {
            this.isUserToActivate = false;
            this.dialogRef.close();
            if(this.returnUrl!="/register") {
              this.router.navigate([this.returnUrl]);
              this.cartService.getUserCart(this.user_id)
              .pipe()
              .subscribe(
                data => {
                  let numberOfItems = 0;
                  for (let item of data) {
                    numberOfItems += item.movieUserCartCount;
                  }
                  this.numberOfItemsService.ChangeNumberOfItemsInCartMessage(numberOfItems);
                },
                error => {
                  console.log(error);
                }
              );
            }
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
    this.checkValidationBeforeSubmit(this.activationGroupControl);
    if (this.activationGroupControl.invalid){
      this.submitted = false;
      return;
    }
    this.loading = true;
    this.error = '';
    
    this.userActivation.user_id = this.user_id;
    this.userActivation.user_activation_code = this.activationcode.value;

    this.authenticationService.validateUser(this.userActivation)
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
