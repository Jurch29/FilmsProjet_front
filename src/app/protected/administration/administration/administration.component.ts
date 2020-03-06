import { Component, OnInit } from '@angular/core';
import { LightmodeService } from 'src/app/core/service/lightmode.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  subscriptionlightMode: any;
  lightMode: boolean;

  constructor( private lightmodeService: LightmodeService) { }

  ngOnInit() {
    this.subscriptionlightMode = this.lightmodeService.getLightModeEventMessage().subscribe(value =>
      this.lightMode = value
    );
  }

  ngOnDestroy() {
    this.subscriptionlightMode.unsubscribe();
  }

}
