import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { LightmodeService } from 'src/app/core/service/lightmode.service';
import { MatDialogRef } from '@angular/material';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit,OnDestroy {

  oldPasswd = new FormControl('', [Validators.required]);
  newPasswd = new FormControl('', [Validators.required,Validators.minLength(6)]);
  confPasswd = new FormControl('', Validators.required);
  
  subscriptionlightMode: any;
  lightMode: boolean;
  loading = false;
  submitted = false;
  isForgetPassword = false;
  hide: boolean;

  groupControl = new FormGroup({
    oldPasswd : this.oldPasswd,
    newPasswd :this.newPasswd,
    confPasswd : this.confPasswd
  });

  emailForgetPassword = new FormControl('',[Validators.required,Validators.email]);

  emailForgetPasswordGroupControl = new FormGroup({
    emailForgetPassword: this.emailForgetPassword
  });

  

  constructor(private authenticationService : AuthenticationService,public dialogRef: MatDialogRef<ChangePasswordComponent>, private lightmodeService : LightmodeService) { }
  ngOnInit() {  
    this.hide = true;
    this.subscriptionlightMode =  this.lightmodeService.getLightModeEventMessage().subscribe(value =>
      this.lightMode = value
    );
  }
  ngOnDestroy(){
    this.subscriptionlightMode.unsubscribe();
  }
  changePassword(){
    this.submitted = true;
    this.checkValidationBeforeSubmit(this.groupControl);
    this.oldPasswdCheck();
    if (this.groupControl.invalid){
      this.submitted = false;
      return;
    }
    this.authenticationService.currentUserValue.userPassword = this.newPasswd.value;
    this.dialogRef.close();
  }

  sendEmailForggetPassword(){
    this.checkValidationBeforeSubmit(this.emailForgetPasswordGroupControl);
    if(this.emailForgetPasswordGroupControl.invalid){
      return;
    }
    this.dialogRef.close();
    
    //to do
  }

  getErrorEmailForgetPassword(){
    if(this.emailForgetPassword.hasError('required'))return 'Champ recquis' ;
    else if(this.emailForgetPassword.hasError('email'))return 'Email invalide';
    return '';
  }

  forgetPassword(){
    this.isForgetPassword = true;
  }
  checkValidationBeforeSubmit(group){
    Object.keys(group.controls).forEach(field => { 
      const control = group.get(field);           
      control.markAsTouched({ onlySelf: true });      
    });
  }
  oldPasswdCheck(){
    console.log(this.authenticationService.currentUserValue.userPassword)
    console.log(this.oldPasswd.value)
    if(this.oldPasswd.value  != this.authenticationService.currentUserValue.userPassword)
      this.oldPasswd.setErrors({ unmatch: true });
    else
      this.oldPasswd.setErrors(null);
  }
  confPasswdCheck() {
    if (this.newPasswd.value !== this.confPasswd.value) 
      this.confPasswd.setErrors({ unmatch: true });
    else
    this.confPasswd.setErrors(null);
  }

}
