import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../changepasswordadm/changepasswordadm.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AdministrationService } from 'src/app/core/service/administration.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-adddatamovieadm',
  templateUrl: './adddatamovieadm.component.html',
  styleUrls: ['./adddatamovieadm.component.css']
})
export class AdddatamovieadmComponent implements OnInit {

  lastname = new FormControl('', Validators.required);
  firstname = new FormControl('', Validators.required);

  category = new FormControl('', Validators.required);

  error: any;
  submitted = false;

  groupControl = new FormGroup({
    lastname: this.lastname,
    firstname: this.firstname,
  });

  groupControlCat = new FormGroup({
    category: this.category
  });

  constructor(public dialogRef: MatDialogRef<AdddatamovieadmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private AdministrationService: AdministrationService) { }

  ngOnInit() {
    
  }

  addActor(){
    this.submitted = true;
    if (this.groupControl.invalid) {
      this.submitted = false;
      return;
    }

    this.AdministrationService.addActor(this.firstname.value,this.lastname.value).pipe(first())
    .subscribe(
      data => {
        this.dialogRef.close("ok");
      },
      error => {
        console.log(error);
      });
  }

  addAuthor(){
    this.submitted = true;
    if (this.groupControl.invalid) {
      this.submitted = false;
      return;
    }

    this.AdministrationService.addAuthor(this.firstname.value,this.lastname.value).pipe(first())
    .subscribe(
      data => {
        this.dialogRef.close("ok");
      },
      error => {
        console.log(error);
      });
  }

  addCategory(){
    this.submitted = true;
    if (this.groupControlCat.invalid) {
      this.submitted = false;
      return;
    }

    this.AdministrationService.addCategory(this.category.value).pipe(first())
    .subscribe(
      data => {
        this.dialogRef.close("ok");
      },
      error => {
        console.log(error);
      });
  }

}
