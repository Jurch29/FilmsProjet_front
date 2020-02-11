import { Component, OnInit } from '@angular/core';
import { LightmodeService } from 'src/app/core/service/lightmode.service';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit {
  subscriptionlightMode: any;
  lightMode: boolean;

  constructor(private lightmodeService : LightmodeService) { }

  ngOnInit() {
    this.subscriptionlightMode = this.lightmodeService.getLightModeEventMessage().subscribe(dataTransmited =>{
      this.lightMode = dataTransmited;
    });
  }

}
