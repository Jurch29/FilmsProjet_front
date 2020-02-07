import { Component, OnInit,OnDestroy } from '@angular/core';
import { LightmodeService } from 'src/app/core/service/lightmode.service';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit,OnDestroy {


  subscriptionlightMode: any;
  lightMode : boolean;
  lastname = new FormControl('', Validators.required);
  firstname = new FormControl('', Validators.required);
  username = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
 
  constructor(private authenticationService : AuthenticationService,private lightmodeService : LightmodeService) { }

  ngOnInit() {
    this.subscriptionlightMode = this.lightmodeService.getLightModeEventMessage().subscribe(dataTransmited =>{
      this.lightMode = dataTransmited;
    });
    console.log(this.authenticationService.currentUserValue)
    this.lastname.setValue(this.authenticationService.currentUserValue.userLastname);
    this.firstname.setValue(this.authenticationService.currentUserValue.userFirstname);
    this.username.setValue(this.authenticationService.currentUserValue.userLogin);
    this.email.setValue(this.authenticationService.currentUserValue.userEmail);
  }


  ngOnDestroy(): void {
    this.subscriptionlightMode.unsubscribe();
  }
  changeUserDetails(){}
}
