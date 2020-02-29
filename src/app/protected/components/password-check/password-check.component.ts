import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/core/service/user.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { first } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-password-check',
  templateUrl: './password-check.component.html',
  styleUrls: ['./password-check.component.css']
})
export class PasswordCheckComponent implements OnInit {

  confPasswd = new FormControl('', Validators.required);
  error: any;
  submitted = false;
  groupControl = new FormGroup({confPasswd: this.confPasswd});

  constructor(private userservice: UserService, private authenticationService: AuthenticationService,
              public dialogRef: MatDialogRef<PasswordCheckComponent>) { }

  ngOnInit() {
  }

  validatePassword() {
    if (this.groupControl.invalid){
      this.submitted = false;
      return;
    }
    return new Promise((resolve, reject) => {
      this.userservice.checkUserPassword(this.authenticationService.currentUserValue.userId, this.confPasswd.value)
      .pipe(first())
      .subscribe(
        data => {
          this.confPasswd.setErrors(null);
          this.dialogRef.close(this.confPasswd.value);
          return resolve(true);
        },
        error => {
          if (error.unmatch == true)
            this.confPasswd.setErrors(error);
          else
            this.error = error;
            return  resolve(false);
        });
      });
  }

}
