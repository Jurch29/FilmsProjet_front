import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdministrationService } from 'src/app/core/service/administration.service';

export interface DialogData {
  id: string;
}

@Component({
  selector: 'app-changepasswordadm',
  templateUrl: './changepasswordadm.component.html',
  styleUrls: ['./changepasswordadm.component.css']
})
export class ChangepasswordadmComponent implements OnInit {

  password = new FormControl('', Validators.required);
  error: any;
  submitted = false;
  hide: any;
  loading: any = false;
  groupControl = new FormGroup({password: this.password});

  constructor(public dialogRef: MatDialogRef<ChangepasswordadmComponent>, private AdministrationService: AdministrationService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  validatePassword() {
    if (this.groupControl.invalid){
      this.submitted = false;
      return;
    }
    return new Promise((resolve, reject) => {
      this.AdministrationService.updatePassword(this.data.id,this.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.dialogRef.close("OK");
          return resolve(true);
        },
        error => {
          console.log(error);
        });
    });
  }

}