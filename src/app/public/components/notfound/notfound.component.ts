import { Component, OnInit, OnDestroy } from '@angular/core';
import { LightmodeService } from 'src/app/core/service/lightmode.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit,OnDestroy {
  subscriptionlightMode: any;
  lightMode: boolean;

  constructor(private lightmodeService : LightmodeService) { }

  ngOnInit() {
    this.subscriptionlightMode =  this.lightmodeService.getLightModeEventMessage().subscribe(value =>
      this.lightMode = value
    );
  }

  ngOnDestroy(){
    this.subscriptionlightMode.unsubscribe();
  }
  
}
