import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { AdministrationService } from 'src/app/core/service/administration.service';
import { MatDialogRef } from '@angular/material';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-adduseradm',
  templateUrl: './adduseradm.component.html',
  styleUrls: ['./adduseradm.component.css']
})
export class AdduseradmComponent implements OnInit {

  lastname = new FormControl('', Validators.required);
  firstname = new FormControl('', Validators.required);
  login = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);

  error: any;
  submitted = false;

  groupControl = new FormGroup({
    lastname: this.lastname,
    firstname: this.firstname,
    login: this.login,
    email: this.email,
    password: this.password
  });

  constructor(private AdministrationService: AdministrationService, public dialogRef: MatDialogRef<AdduseradmComponent>) { }

  ngOnInit() {
  }

  addUser(){
    this.submitted = true;
    if (this.groupControl.invalid) {
      this.submitted = false;
      return;
    }
    let newdUser : User = new User();

    newdUser.userFirstname = this.firstname.value;
    newdUser.userLastname = this.lastname.value;
    newdUser.userLogin = this.login.value;
    newdUser.userEmail = this.email.value;
    newdUser.userPassword = this.password.value;

    this.AdministrationService.addUser(newdUser).pipe(first())
    .subscribe(
      data => {
        this.dialogRef.close("OK");
      },
      error => {
        console.log(error);
      });
  }

}
