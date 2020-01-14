import { Component, OnInit, Directive, OnDestroy } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { first } from 'rxjs/operators';

import { User } from '../../../shared/models/user';
import { Role } from 'src/app/shared/models/role';

import { AuthenticationService } from '../../../core/service/authentication.service';
import { LightmodeService } from 'src/app/core/service/lightmode.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
@Directive({
  selector: '[appBlockCopyPaste]'
})
export class RegisterComponent implements OnInit , OnDestroy{
  user: User;

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  breakpoint: number;
  lastname = new FormControl('', Validators.required);
  firstname = new FormControl('', Validators.required);
  username = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  passwd = new FormControl('', [Validators.required,Validators.minLength(6)]);
  passwdControl = new FormControl('', Validators.required);
  
  
  size: number= 3;
  sizeBig : number = 4;
  mobileSize :boolean =false;

  hide: boolean;
  subscriptionlightMode: any;
  lightMode: boolean;
  rowheight: string;

  groupControl = new FormGroup({
    lastname : this.lastname,
    firstname : this.firstname,
    username : this.username,
    email : this.email,
    passwd :this.passwd,
    passwdControl : this.passwdControl
  });

  
  constructor(private lightmodeService : LightmodeService, private authenticationService: AuthenticationService) {
    this.user = new User();
  }

  ngOnInit() {
    this.hide = true;
    this.subscriptionlightMode = this.lightmodeService.getLightModeEventMessage().subscribe(dataTransmited =>{
      this.lightMode = dataTransmited;
    });
    this.TestSize();
  }
  ngOnDestroy(): void {
    this.subscriptionlightMode.unsubscribe();
  }
  TestSize(){
    
    if(window.innerWidth<=775){
      this.breakpoint =1;
      this.size=1;
      this.sizeBig=0;
      this.rowheight = "100px";
      this.mobileSize=true;
    }else{
        this.breakpoint =9;
        this.size =3;
        this.sizeBig = 4;
        this.rowheight ="115px";
        this.mobileSize=false;
    }
  }
  onResize(event) {
    this.TestSize();
  }

  register(){
    this.submitted = true;
    this.checkValidationBeforeSubmit();
    if (this.groupControl.invalid){
      this.submitted = false;
      return;
    }

    this.user.lastname = this.lastname.value;
    this.user.firstname = this.firstname.value;
    this.user.username = this.username.value;
    this.user.email = this.email.value;
    this.user.password = this.passwd.value;
    this.user.role = [Role.User];

    this.authenticationService.register(this.user).pipe(first())
    .subscribe(
        data => {
            console.log(data);
        },
        error => {
        });
  }
  checkValidationBeforeSubmit(){
    Object.keys(this.groupControl.controls).forEach(field => { 
      const control = this.groupControl.get(field);           
      control.markAsTouched({ onlySelf: true });      
    });
  }
  passwdControlCheck() {
          if (this.passwd.value !== this.passwdControl.value) 
            this.passwdControl.setErrors({ unmatch: true });
          else
          this.passwdControl.setErrors(null);
  }

}
