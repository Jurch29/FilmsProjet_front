import { Component, OnInit, OnDestroy } from '@angular/core';
import { LightmodeService } from 'src/app/core/service/lightmode.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

import { UserService } from 'src/app/core/service/user.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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

  newPasswd = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confPasswd = new FormControl('', Validators.required);

  groupControl = new FormGroup({
    newPasswd: this.newPasswd,
    confPasswd: this.confPasswd,
  });

  constructor(private activatedRoute: ActivatedRoute, private userservice: UserService, private authenticationService: AuthenticationService, private lightmodeService: LightmodeService) 
  { 
    this.activatedRoute.queryParams.subscribe(params => {
      let token = params['token'];
      console.log(token); // Print the parameter to the console.
  });
  }

  ngOnInit() {
    this.subscriptionlightMode = this.lightmodeService.getLightModeEventMessage().subscribe(value =>
      this.lightMode = value
    );
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
      console.log('BOOMM');
    }
  }
}
