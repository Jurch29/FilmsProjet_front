import { Component, OnInit, Directive, HostListener } from '@angular/core';
import { Validators, FormControl, FormArray, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
@Directive({
  selector: '[appBlockCopyPaste]'
})
export class RegisterComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  lastname = new FormControl('', Validators.required);
  firstname = new FormControl('', Validators.required);
  username = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  passwd = new FormControl('', [Validators.required,Validators.minLength(6)]);
  passwdControl = new FormControl('', Validators.required);


  groupControl = new FormGroup({
    lastname : this.lastname,
    firstname : this.firstname,
    username : this.username,
    email : this.email,
    passwd :this.passwd,
    passwdControl : this.passwdControl
  });

  hide: boolean;
  constructor(public dialogRef: MatDialogRef<RegisterComponent>) {
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.hide = true;
  }

  register(){
    this.submitted = true;
    if (this.groupControl.invalid){
      this.submitted = false;
      return;
    }
  }
  passwdControlCheck() {
          if (this.passwd.value !== this.passwdControl.value) 
            this.passwdControl.setErrors({ unmatch: true });
          else
          this.passwdControl.setErrors(null);
  }

}
