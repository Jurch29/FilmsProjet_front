import { Component, OnInit, OnDestroy } from '@angular/core';
import { LightmodeService } from 'src/app/core/service/lightmode.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

import { UserService } from 'src/app/core/service/user.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent implements OnInit {

  subscriptionlightMode: any;
  lightMode: boolean;
  loading = false;
  submitted = false;
  error: any;
  token : string;
  email : string;
  expiredToken: boolean = false;

  newPasswd = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confPasswd = new FormControl('', Validators.required);

  groupControl = new FormGroup({
    newPasswd: this.newPasswd,
    confPasswd: this.confPasswd,
  });

  constructor(private activatedRoute: ActivatedRoute, private userservice: UserService,
              private authenticationService: AuthenticationService, private lightmodeService: LightmodeService,
              private router: Router,) 
  { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['user_email'];
    });
  }

  ngOnInit() {
    this.subscriptionlightMode = this.lightmodeService.getLightModeEventMessage().subscribe(value =>
      this.lightMode = value
    );
    if (this.token==undefined)
        this.router.navigate(['/']);
        
    this.authenticationService.validatePasswordResetToken(this.token)
    .pipe(first())
    .subscribe(
      data => {
        if (data.message==="invalid token"){
          this.router.navigate(['/']);
        }
        else if (data.message==="expired token"){
          this.expiredToken = true;
        }
      },
      error => {
        console.log(error);
      });
  }

  ngOnDestroy() {
    this.subscriptionlightMode.unsubscribe();
  }

  checkValidationBeforeSubmit(group) {
    Object.keys(group.controls).forEach(field => {
      const control = group.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  confPasswdCheck() {
    if (this.newPasswd.value !== this.confPasswd.value)
      this.confPasswd.setErrors({ unmatch: true });
    else
      this.confPasswd.setErrors(null);
  }

  changePassword() {
    this.submitted = true;
    this.checkValidationBeforeSubmit(this.groupControl);
    if (!this.groupControl.invalid){
      this.authenticationService.resetPassword(this.token, this.newPasswd.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          //ok
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
        });
    }
  }

  reSend(){
    this.userservice.forgetPasswordEmailOnly(this.email)
    .pipe(first())
    .subscribe(
      data => {
        //OK
        console.log(data);
      },
      error => {
        console.log(error);
        this.error = error;
        this.loading = false;
      });
  }

}